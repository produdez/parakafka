console.log("This is producer ...");

const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9093']
});

let count = 0;

const producer = kafka.producer();

const main = async () => {

    try {
        await producer.connect();
        
        const responses = await producer.send({
            topic: 'test1', 
            messages: [
                { value: `Send ${(++count)} messages`},
            ],
        });
    
        console.log('Published message', { responses })
    } catch (error) {
        console.error('Error publishing message', error)
        process.exit(1)
    }
}

setInterval(main, 3000)