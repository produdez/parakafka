# README

# How to run

## Install
1. Docker
2. Node

## Run
1. **Run docker CLI!** 🥇
2. `npm install` -> install dependencies
3. `docker compose up` -> start kafka server
4. `npm run start:server` -> Run server listening to web hook on port 3000 and send to kafka
5. `npm run start:consumer` -> Run consumer and connect to kafka
6. Do testing

## Testing
**The bin folder contains some binary runtime to help testing**
`./bin/<function> <arguments>*`
1. Create topic (dont need this) `./bin/create-topic "npm-package-published" 3`
2. Send message! `send-event <url> <secret> <payload_path>` 
     
     - Ex: `./bin/send-event http://localhost:3000/hook "very-secret-string" ./resource/test_payload.json`
