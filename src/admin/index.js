const { Kafka } = require("kafkajs");
const config = require("../config");


const createAdmin = require("./admin");

const kafka = new Kafka(config.kafka);

const main = async () => {
    const admin = await createAdmin({ kafka, config });

    const shutdown = async () => {
        await admin.disconnect();
    };

    return shutdown;
};

const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

main()
  .then(async (shutdown) => {
    signalTraps.forEach((signal) => {
        process.on(signal, async () => {
        console.log(`Received ${signal} signal. Shutting down.`);
        try {
            await shutdown();
            process.exit(0);
        } catch (error) {
            console.log("Error during shutdown", error);
            process.exit(1);
        }
        });
    });
  })
  .catch((error) => {
    console.log("Error during startup", error);
    process.exit(1);
});
