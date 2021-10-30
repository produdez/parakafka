const { Kafka } = require("kafkajs");
const config = require("../config");
const logger = config.logger;
const createConsumer = require("./consumer");

const kafka = new Kafka(config.kafka);

const main = async () => {
  try {
    const consumer = await createConsumer({ kafka, config });
    logger.info('Consumer Connected!');
  } catch (error) {
    //console.log('Result:', result);
    console.error('Error message', error);
    await producer.disconnect();
    process.exit(1);
  }
};

const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

main();
