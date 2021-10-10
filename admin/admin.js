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
                replicationFactor: 3,
                numPartitions: 3,

            //     replicaAssignment: [
            //         {
            //             partition: 0,
            //             leader: 0,
            //             replicas: [0, 1, 2]
            //         },
            //         {
            //             partition: 1,
            //             leader: 1,
            //             replicas: [1, 0, 2]
            //         }
            //     ]
            }] 
        });
        console.log('Result: ', result);

        // await admin.createPartitions({
        //     topicPartitions: [{
        //         topic: 'test',
        //         count: 3,
        //     }]
        // });

        console.log('Create partition successfully!');

        await admin.disconnect();
    } catch (error) {
        //console.log('Result:', result);
        console.error('Error publishing message', error);
        await producer.disconnect();
        process.exit(1);
    }
    finally {
        process.exit(0);
    }
}