// ! CURRENTLY NOT USED
// due to the fact that this connect directly to kafka, which is un-realistic!
const logger = require('../config').logger

let count = 0;

module.exports = async ({ kafka, config }) => {
  
  logger.warn('Creating Producer!')
  const producer = kafka.producer(config.producer);

  await producer.connect();

  setInterval(() => {
    send_data(producer)
  }, 3000);

  return producer;
};


async function send_data(producer){
    data = gen_data()
    partition = choose_partition()
    topic = 'test-topic'
    message = JSON.stringify({
      'data' : data,
      'partition' : partition,
      'topic' : topic,
    })

    try{
      const responses = await producer.send({
          topic: topic, 
          messages: [
              {
                  value: message,
                  partition: partition
              }   
          ]
        });
      logger.info(`Published message of topic: ${topic}, to partition: ${partition} `, responses);
    } catch (error) {
      logger.error('Error publishing message', error)
      await producer.disconnect();
      process.exit(1);  
    }
}

function gen_data(){
  return ++count
}

function choose_partition(){
  return count%2
}
