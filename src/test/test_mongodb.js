const { json } = require('express');
const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost';
const client = new MongoClient(url);

// Database Name
const dbName = 'test';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('test_col');

  // the following code examples can be pasted here...
	data = await collection.find({}).toArray()
	return data
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
