const logger = require('../config').logger
const { connectDB } = require('./mongo_util')

module.exports = async ({ kafka, config }) => {
  
  logger.warn('Creating Consumer!')
  const consumer = kafka.consumer(config.consumer);

  await consumer.connect();

  await consumer.subscribe({ topic: config.app.topic, fromBeginning: true });

  const {db, collection} = await connectDB()

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      data = JSON.parse(message.value.toString())
      logger.info(`Consumer received message ${JSON.stringify(data)} on topic: ${topic} - partition: ${partition}`)      // The data read from kafka will always be of type serialized, so we need to parse to correct type to write to DB

      let kafka_data = {topic: topic, partition: partition, timestamp_kafka: message.timestamp}
      let consumer_data = {timestamp_db: Date.now()}
      let producer_data = data

      let merged = Object.assign({}, kafka_data, consumer_data, producer_data)
      collection.insertOne(merged)
    },
  });

  return consumer;
};
