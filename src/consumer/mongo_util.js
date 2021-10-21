const { MongoClient } = require('mongodb');
const config = require("../config");
const logger = config.logger;
const dbConfig = config.db;

// Connection uri
const client = new MongoClient(dbConfig.uri);

async function connectDB(){
  await client.connect();
  db = client.db(dbConfig.db_name);
  collection = db.collection(dbConfig.collection_name);
  logger.info('Connected successfully to mongoDB');

  return {db: db, collection: collection}
}
//! Example on how to use mongodb
async function example(){
  // get all tuples
  await collection.find({})
  // insert one
  await collection.insertOne({data: 2})
  // insert many
  await collection.insertMany([{data: 5},{data: 6}])
}


module.exports = {
  connectDB
}
  