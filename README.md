# README

# Some CLI of Kafka with Docker

1. create new topic: docker-compose exec kafka kafka-topics --create --zookeeper zookeeper  --replication-factor 1  --partitions 1 --topic test
2. describe a topic: docker-compose exec kafka kafka-topics --describe --topic test --zookeeper zookeeper
3. list all topics: docker-compose exec kafka kafka-topics --list --zookeeper zookeeper