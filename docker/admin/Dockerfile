#! This has been integrated in docker compose to run along side kafka

# Base
# Use 12-alpine for smaller image size
FROM node:12-alpine

# work dir
WORKDIR /app

# packages and .ENV
# use seperated package.json
COPY ./resource/admin/package.json . 
COPY .env .
RUN npm install

# tools
COPY ./src/tools ./src/tools
# all shared source files
COPY ./src/*.* ./src

# related source
COPY ./src/admin ./src/admin

# commands
CMD ["node", "src/admin/index.js"]