const createHookReceiver = require('npm-hook-receiver');
const logger = require('../config').logger;

module.exports = ({ producer, config }) => {
  const server = createHookReceiver({
    secret: config.secret,
    mount: config.mount,
  });
  logger.info(`Server secret: ${config.secret}`);

  server.on('package:publish', async (package) => {
    logger.info(`Received webhook event: ${JSON.stringify(package)}`);

    if (!package.topic) throw 'Package missing topic';

    try {
      await producer.send({
        topic: package.topic,
        messages: [get_data(package)],
      });
    } catch (error) {
      logger.error(`Failed to publish webhook message`, error);
    }
  });
  server.on('hook:error', (message) => {
    logger.error('Hook receive Error: ', message);
  });

  return server;
};

function get_data(package) {
  return {
    timestamp: package.timestamp,
    value: `${package.data}`
  };
}
