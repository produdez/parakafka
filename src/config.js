// ! IMPORTANT: this is for setup needed things for every server/client environment that use this project
require('./env_setup')

// ! THESE ARE ALL THE MODULES and TOOLS

const server = { port: process.env.PORT || 3000 };

const kafka = {
  clientId: 'parakafka',
  brokers: ['localhost:9092', 'localhost:9093'],
  ssl: process.env.KAFKA_SSL ? JSON.parse(process.env.KAFKA_SSL) : false,
  sasl:
    process.env.KAFKA_USERNAME && process.env.KAFKA_PASSWORD
      ? {
          username: process.env.KAFKA_USERNAME,
          password: process.env.KAFKA_PASSWORD,
          mechanism: 'plain'
        }
      : null,
};

const consumer = {
  groupId: process.env.KAFKA_GROUP_ID || 'parakafka',
};

const producer = {
  // TODO: to fill this with settings
}

const app = {
  secret: process.env.HOOK_SECRET,
  topic: process.env.TOPIC || 'test-topic',
  mount: '/hook',
};

const processor = {
  topic: app.topic,
};

const logger = require('./tools/winston_logger')

module.exports = {
  server,
  kafka,
  consumer,
  app,
  processor,
  logger,
};
