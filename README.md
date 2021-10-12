# README

# How to run

## Install
1. Docker
2. Docker CLI
3. NodeJS

## Prerequisites
1. Install docker-compose `brew install docker-compose`
2. Prepare .env file:
  - Create a `.env` file in root folder (same folder as git ignore)
  - Fill in needed information
    1. `HOOK_SECRET=<secret>` ex: secret = `123456` (IMPORTANT)
    2. Other variables like:
       1. PORT
       2. TOPIC
       3. ... (can be ignored for now)
    3. **NOTE:** I've added `.env_example` file already, just rename it into `.env` and add needed infos

## Run
1. **Run docker CLI!** 🥇
2. `npm install` -> install dependencies
3. `docker compose up` -> start kafka server
4. `npm run start:server` -> Run server listening to web hook on port 3000 and send to kafka
5. `npm run start:consumer` -> Run consumer and connect to kafka
6. Do testing

## Testing
**The bin folder contains some binary runtime to help testing**

**Example code to run in CLI:** `./bin/<function> <arguments>*`, some functions below:
1. Create topic (dont need this) `./bin/create-topic "test-topic" 3`
2. Send message! `send-event <url> <secret> <payload_path>` 
     
     - Ex: `./bin/send-event http://localhost:3000/hook "<hook-secret>" ./resource/test_payload.json`

Use send message function to test for now, have not make producer code yet


## Note:

1. Logging tool is included, just require `logger` from `config` to log, read in tool folder


.

.

# TODO
1. Find out exactly how server is interacting with kafka
   1. Find a way to interact with kafka cli
   2. Or find a kafka UI tool or something similar 
2. Add multi brokers for kafka 
3. Add Producer
4. Multi-thread producer
5. Multi-thread consumer
