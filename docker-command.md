# Builds
**NOTE: server is integrated in with kafka in docker-compose already!**
- Build server
  - No cache and logging
  - docker build . -f docker/server/Dockerfile --progress=plain --no-cache -t parakafka/server
  - Just build, with cache
  - docker build . -f docker/server/Dockerfile -t parakafka/server

- Run server
  - docker run --name=parakafka_server --net=host parakafka/server
  - NOTE: net can be of many kinds: custom/bridge/host/none/overlay
  - Current custom network for kafka cluster is `parakafka_kafka-net` (not a typo :v)

- Run producer
  - docker-compose -f docker-compose-producer.yml up