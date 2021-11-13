// ! CURRENTLY NOT USED
// due to the fact that this connect directly to kafka, which is un-realistic!
const logger = require('../config').logger;
const { v4: uuidv4 } = require('uuid');

module.exports = async ({ kafka, config }) => {
  logger.warn('Creating Producer!');
  const producer = kafka.producer(config.producer);
  const producer_interval = config.producer_interval;
  const producer_id = uuidv4(); //create uid at runtime

  logger.warn(
    `Creating Producer ${producer_id}, data send interval is: ${producer_interval}`
  );

  await producer.connect();

  setInterval(() => {
    send_data(producer, { producer_id, ...config });
  }, producer_interval);

  return producer;
};

async function send_data(producer, config) {
  data = gen_data(config);
  // partition = choose_partition(); //auto partitioning
  topic = 'test-topic';
  message = JSON.stringify({
    data: data,
    partition: 0,
    topic: topic,
  });

  logger.info(`Message created: ${message} `);

  try {
    const responses = await producer.send({
      topic: topic,
      messages: [
        {
          value: message,
          timestamp: Date.now(),
          partition: 0, //auto partitioning
        },
      ],
    });
    logger.info(
      `prod ${producer_id} message of topic: ${topic}, with message: ${message} `,
      responses
    );
  } catch (error) {
    logger.error('Error publishing message', error);
    await producer.disconnect();
    process.exit(1);
  }
}

var sequence_num = 0;

function gen_data(config) {
  return {
    // sequence number to detect loss, starts with 0,1,2...
    sequence_num: sequence_num++,
    data: random_normal_box_muller(),
    timestamp_producer: Date.now(),
    producer_id: config.producer_id,
  };
}

// Standard Normal variate using Box-Muller transform.
// Note that that mean is 0.5, not 0
function random_normal_box_muller() {
  var u = 0,
    v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}
