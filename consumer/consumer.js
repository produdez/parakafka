console.log('This is consumer ...');

const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092', 'localhost:9093']
})

const consumer = kafka.consumer({ groupId: 'test-group' })
const consumer1 = kafka.consumer({ groupId: 'test-group' })

const main = async () => {

    try {
        console.log('Connecting ... ... ...');
        await consumer.connect();
        await consumer1.connect();

        console.log('Connected => Subscribing ... ... ...');
        await consumer.subscribe({ topic: 'test', fromBeginning: true });
        await consumer1.subscribe({ topic: 'test', fromBeginning: true });
        
        console.log('Subscribed');
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log(`Consumer 0 received message at topic ${topic}`, {
                    value: message.value.toString(),
                })
            }
        });

        await consumer1.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log(`Consumer 1 received message at topic ${topic}`, {
                    value: message.value.toString(),
                })
            }
        });


    } catch (error) {
        console.error('Fucking Error: ', error)
    }
}

main().catch(async error => {
    console.error(error)
    try {
      await consumer.disconnect()
    } catch (e) {
      console.error('Failed to gracefully disconnect consumer', e)
    }
    process.exit(1)
  })
