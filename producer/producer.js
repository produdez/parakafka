console.log("This is producer ...");

const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});

let count = 0;

const producer = kafka.producer();

run();
setInterval(run, 3000);

async function run() {

    try {
        await producer.connect();
        let par = (count % 2 == 0) ? 0 : 1;
        const responses = await producer.send({
            topic: 'test', 
            messages: [
                {
                    value: `Send ${(++count)} messages at partition ${par}`,
                    partition: par
                }   
            ]
        });
    
        console.log('Published message', responses);

    } catch (error) {
        console.error('Error publishing message', error);
        await producer.disconnect();
        process.exit(1);
    }
}