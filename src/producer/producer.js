const logger = require('../config').logger;


module.exports = async ({ config }) => {
  const producer_interval = config.producer_interval
  logger.warn(`Creating Producer ${config.producer_id}, data send interval is: ${producer_interval}`);

  // * random number sent every interval
  return setInterval(() => {
    send_data(config);
  }, producer_interval);
};

async function send_data(config) {
  data = gen_data(config);

  payload = Buffer.from(
    JSON.stringify({
      // ! This is important for server to route to appropriate topic
      topic: config.topic,

      // ! Here are important data
      data: data,

      // * These ones below are just needed for webhook sending
      event: 'package:publish',
      type: 'package',
      hookOwner: { username: 'produdez' },
    })
  );

  try {
    await send_data_to_web_hook(payload, config.url, config.secret);
    console.log(
      `Produde ${config.producer_id} published webhook, topic: ${config.topic} with data: ${JSON.stringify(data)}`
    );
  } catch (error) {
    logger.error('Error publishing payload to webhook', error);
    process.exit(1);
  }
}

function gen_data(config){
  return {
    data: random_normal_box_muller(),
    timestamp_producer: Date.now(),
    producer_id: config.producer_id,
  }
}

// Standard Normal variate using Box-Muller transform.
// Note that that mean is 0.5, not 0
function random_normal_box_muller() {
  var u = 0, v = 0;
  while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while(v === 0) v = Math.random();
  return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

const http = require('http');
const crypto = require('crypto');

async function send_data_to_web_hook(payload, url, secret) {
  if (!secret || !payload) {
    throw 'Cant send data without secret-key and payload';
  }

  const signature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return new Promise((resolve, reject) => {
    const req = http.request(
      url,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-npm-signature': `sha256=${signature}`,
        },
        method: 'POST',
      },
      (res) => {
        if (res.statusCode >= 400) {
          reject(
            new Error(
              `Server returned statusCode ${res.statusCode}: ${res.statusMessage}`
            )
          );
        } else {
          res.setEncoding('utf-8');
          let body = '';
          res.on('data', (chunk) => (body += chunk));
          res.on('end', () => {
            logger.info(`Response: ${body}`);
            resolve();
          });
        }
      }
    );

    req.on('error', (error) => {
      logger.error('Error during request: ', error);
      reject(error);
    });

    req.write(payload);

    req.end();
  });
}
