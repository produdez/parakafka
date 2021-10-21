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
      var today = new Date();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      logger.info(`Consumer received message ${message.value.toString()} on topic: ${topic} - partition: ${partition}`)

      data = {time: time, data: message.value, topic: topic, partition: partition}
      collection.insertOne(data)
    },
  });

  return consumer;
};
