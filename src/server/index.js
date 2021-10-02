const { Kafka } = require("kafkajs");
const config = require("../config");
const logger = config.logger;
const createApp = require("./app");

const client = new Kafka(config.kafka);
const producer = client.producer();


const main = async () => {
  //? wait until producer connects to kafka
  await producer.connect();


  const app = createApp({ producer, config: config.app });
  //? create app and listen on port for web hooks
  const server = app.listen(config.server.port, (error) => {
    if (error != null) {
      logger.error(error)
      throw error;
    }

    logger.info(`Server is listening on port ${config.server.port}`);
  });

  const shutdown = async () => {
    await server.close();
    await producer.disconnect();
  };

  return shutdown;
};


const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

// ? Run until shutdown and log the shutdown!
main() 
  .then(async (shutdown) => {
    signalTraps.forEach((signal) => {
      process.on(signal, async () => {
        logger.info(`Received ${signal} signal. Shutting down.`);
        try {
          await shutdown();
          process.exit(0);
        } catch (error) {
          logger.error("Error during shutdown", error);
          process.exit(1);
        }
      });
    });
  })
  .catch((error) => {
    logger.error("Error during startup", error);
    process.exit(1);
  });
