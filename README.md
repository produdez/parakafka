# README

# Some CLI of Kafka with Docker

1. create new topic: docker-compose exec kafka kafka-topics --create --zookeeper zookeeper  --replication-factor 1  --partitions 1 --topic test
2. describe a topic: docker-compose exec kafka kafka-topics --describe --topic test --zookeeper zookeeper
3. list all topics: docker-compose exec kafka kafka-topics --list --zookeeper zookeeper

# Some helpful commands
## build current Dockerfile to image
$ docker build . [image_name]
- example: $ docker build . app/kafka-admin
## run current image with custom name (or u will be given a wtf name);  Note: --net=host to map "localhost" in docker
$ docker run --name=[container_name] --net=host [image_name]
- example: $ docker run --name=admin-1 --net=host app/kafka-admin

## re-run the container 
$ docker start [container_name] 
-example: $ docker start admin-1 

## delete the container
$ docker rm [container_name] 
-example: $ docker start admin-1 