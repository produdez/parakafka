// ! IMPORTANT: this is for setup needed things for every server/client environment that use this project
require('./env_setup')

// ! THESE ARE ALL THE MODULES and TOOLS

const server = { port: process.env.PORT || 3000 }

let env_brokers = process.env.BOOTSTRAP_BROKERS.split(' ')
const brokers = env_brokers.length == 0 ? ['localhost:9092', 'localhost:9093', 'localhost:9094'] : env_brokers
const kafka = {
  clientId: 'parakafka',
  brokers: brokers,
  ssl: process.env.KAFKA_SSL ? JSON.parse(process.env.KAFKA_SSL) : false,
  sasl:
    process.env.KAFKA_USERNAME && process.env.KAFKA_PASSWORD
      ? {
          username: process.env.KAFKA_USERNAME,
          password: process.env.KAFKA_PASSWORD,
          mechanism: 'plain'
        }
      : null,
}

const consumer = {
  groupId: process.env.KAFKA_GROUP_ID || 'parakafka',
}


const app = {
  secret: process.env.HOOK_SECRET,
  topic: process.env.TOPIC || 'test-topic',
  mount: '/hook',
}

const hook_url = (process.env.server_url || 'http://localhost:3000') + app.mount

const producer = {
  secret: app.secret,
  topic: app.topic,
  url: hook_url
}

const processor = {
  topic: app.topic,
}

const db = {
  uri: 'mongodb://localhost',
  db_name: 'test',
  collection_name: 'test_collection',
}

const logger = require('./tools/winston_logger')

module.exports = {
  server,
  kafka,
  consumer,
  app,
  processor,
  producer,
  db,
  logger,
}
