console.log("This is admin ...");

const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092', 'localhost:9093']
});

let count = 0;

const admin = kafka.admin();

run();

async function run() {
    
    let result;

    try {
        console.log('Connecting ... ... ...');
        await admin.connect();
        console.log('Connected !!!');
        result = await admin.createTopics({
            topics: [{
                topic: 'test',
                numPartitions: 2,
                replicationFactor: 2,
                // replicaAssignment: [
                //     { 
                //         partition: 0, 
                //         replicas: [1, 2]
                //     },
                //     {
                //         partition: 1, 
                //         replicas: [2, 1]
                //     }
                // ]
            }] 
        });
        console.log('Create successfully!');
        await admin.disconnect();
    } catch (error) {
        console.log('Result:', result);
        console.error('Error publishing message', error);
        await producer.disconnect();
        process.exit(1);
    }
    finally {
        process.exit(0);
    }
}