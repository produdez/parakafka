#! This has been integrated in docker compose to run along side kafka

# Base
FROM node:14

# work dir
WORKDIR /app

# packages and .ENV
COPY package*.json ./
COPY .env ./
RUN npm install

# tools
COPY ./src/tools ./src/tools/
# all shared source files
COPY ./src/*.* ./src/

# related source
COPY ./src/producer ./src/producer/

# commands
CMD ["node", "src/producer/index.js"]
