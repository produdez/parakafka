module.exports = async ({ kafka, config }) => {

    const admin = kafka.admin();

    await admin.connect();

    console.log('Admin Connected!');

    let result = null;

    result = await admin.createTopics({
        topics: [{
            topic: config.app.topic,
            replicationFactor: config.admin.replicationFactor,
            numPartitions: config.admin.numberOfPartitions,
        }] 
    });

    console.log('Result: ', result);

    console.log('Create partition successfully!');

    await admin.disconnect();

    return admin;
}
