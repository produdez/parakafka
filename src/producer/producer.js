const logger = require('../config').logger

let count = 0;

module.exports = async ({ config }) => {
  
  logger.warn('Creating Producer!')

  return setInterval(() => {
    send_data(config)
  }, 3000);
};


async function send_data(config){
    data = gen_data()
    
    payload = Buffer.from(JSON.stringify({
      'data' : data,
      'topic' : config.topic,
      'timestamp' : Date.now(),

      //the ones below are just needed for webhook sending
      "event": "package:publish",
      "type": "package",
      "hookOwner": { "username": "produdez"}
    }))

    try{
      await send_data_to_web_hook(payload, config.url, config.secret);
      console.log(`Published payload through webhook of topic: ${config.topic} with data: ${data}`)
    } catch (error) {
      logger.error('Error publishing payload to webhook', error)
      process.exit(1);  
    }
}

function gen_data(){
  return ++count
}

const http = require('http')
const crypto = require('crypto')

async function send_data_to_web_hook(payload, url, secret){

  if (!secret || !payload) {
    throw 'Cant send data without secret-key and payload'
  }

  const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex')


  return new Promise((resolve, reject) => {
      const req = http.request(url, {
          headers: {
              'Content-Type': 'application/json',
              'x-npm-signature': `sha256=${signature}`
          },
          method: 'POST'
      }, res => {
          if (res.statusCode >= 400) {
              reject(new Error(`Server returned statusCode ${res.statusCode}: ${res.statusMessage}`))
          } else {
              res.setEncoding('utf-8')
              let body = ''
              res.on('data', chunk => body += chunk)
              res.on('end', () => {
                  logger.info(`Response: ${body}`)
                  resolve()
              })
          }
      })
      
      req.on('error', error => {
        logger.error('Error during request: ', error)
        reject(error)
      })

      req.write(payload)

      req.end()
  })
}