//this is older version, just for back up, ignore
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
        
        const responses = await producer.send({
            topic: 'test', 
            messages: [
                { value: `Send ${(++count)} messages`},
            ],
        });
    
        console.log('Published message', { responses });

        //await producer.disconnect();
    } catch (error) {
        console.error('Error publishing message', error);
        await producer.disconnect();
        process.exit(1);
    }
}