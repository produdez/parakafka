# Builds
**NOTE: server is integrated in with kafka in docker-compose already!**
- Build server
  - No cache and logging
  - docker build . -f docker/server/Dockerfile --progress=plain --no-cache -t parakafka/server
  - Just build, with cache
  - docker build . -f docker/server/Dockerfile -t parakafka/server

- Run server
  - docker run --name=parakafka_producer --net=host parakafka/server
