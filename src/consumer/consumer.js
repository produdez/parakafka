const logger = require('../config').logger

module.exports = async ({ kafka, config }) => {
  
  logger.warn('Creating Consumer!')
  const consumer = kafka.consumer(config.consumer);

  await consumer.connect();

  await consumer.subscribe({ topic: config.app.topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const { package, version } = JSON.parse(message.value.toString());

      const text = `I fucking did it :v`;

      var today = new Date();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      logger.info(['MESSAGE: ', text, '- UserName: ', 'Long dep trai','- Time: ', time].join(''))
    },
  });

  return consumer;
};
