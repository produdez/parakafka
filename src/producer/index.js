const { Kafka } = require('kafkajs');
const config = require('../config');
const logger = config.logger;
const createProducer = require('./direct_producer');

const kafka = new Kafka(config.kafka);

const main = async () => {
  const producer = await createProducer({ kafka, config });
  logger.info('Producer Connected!');

  const shutdown = async () => {
    await producer.disconnect();
  };

  return shutdown;
};

const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2'];

main()
  .then(async (shutdown) => {
    signalTraps.forEach((signal) => {
      process.on(signal, async () => {
        logger.info(`Received ${signal} signal. Shutting down.`);
        try {
          await shutdown();
          process.exit(0);
        } catch (error) {
          logger.error('Error during shutdown', error);
          process.exit(1);
        }
      });
    });
  })
  .catch((error) => {
    logger.error('Error during startup', error);
    process.exit(1);
  });
