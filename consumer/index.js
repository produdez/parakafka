//this is older version, just for back up, ignore
console.log("This is consumer ...");

const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092', 'localhost:9093']
})

const consumer = kafka.consumer({ groupId: 'test-group' })

const main = async () => {

    try {

        await consumer.connect()

        await consumer.subscribe({ topic: 'test', fromBeginning: true })
        await consumer.subscribe({ topic: 'test1', fromBeginning: true })

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log(`Received message at ${topic}`, {
                    value: message.value.toString(),
                })
            }
        })
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
