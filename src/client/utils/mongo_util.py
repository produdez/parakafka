# * VERY IMPORTANT TO CONFIG HERE
from pymongo import MongoClient

MONGO_URL = 'mongodb://localhost'

def connect_mongodb(db_name='test', collection_name='test_collection'):
	client = MongoClient(MONGO_URL)
	db=client[db_name]
	collection = db[collection_name]
	return {
		'client' : client,
		'db' : db,
		'collection' : collection,
	}
