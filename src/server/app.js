const createHookReceiver = require("npm-hook-receiver");
const logger = require('../config').logger



module.exports = ({ producer, config }) => {
  const server = createHookReceiver({
    secret: config.secret,
    mount: config.mount,
  });

  server.on(
    "package:publish",
    async ({ name: package, version, time: timestamp }) => {
      logger.info("Received webhook event", {
        package,
        version,
        timestamp,
      });

      try {
        await producer.send({
          topic: config.topic,
          messages: [
            {
              key: package,
              value: JSON.stringify({
                package,
                version,
                timestamp,
              }),
            },
          ],
        });
      } catch (error) {
        logger.error(`Failed to publish webhook message`, error);
      }
    }
  );

  server.on(
    'hook:error',
    (message) => {
      logger.error('Hook receive Error: ', message)
    }
  )
  
  return server;
};
