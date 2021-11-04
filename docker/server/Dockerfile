#! This has been integrated in docker compose to run along side kafka

# Base
# USe alpine for smaller image size
FROM node:12-alpine

# work dir
WORKDIR ./app

# test
RUN pwd
RUN ls

# packages and .ENV
# use seperated package.json
COPY ./resource/server/package.json . 
COPY .env .
RUN npm install

# tools
COPY ./src/tools ./src/tools
# all shared source files
COPY ./src/*.* ./src

# related source
COPY ./src/server ./src/server

# test print
RUN pwd
RUN ls .
RUN ls ./src

# expose port
EXPOSE 3000

# commands
CMD ["node", "src/server/index.js"]
