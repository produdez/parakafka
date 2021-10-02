

function setup(){
  setup_environment()
}

function setup_environment(){
  //? For reading from .env file

  const dotenv = require('dotenv')
  const result = dotenv.config()

  if (result.error) {
    throw result.error
  }
}

setup()
