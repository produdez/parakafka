const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

//? NOTE
/*
Just use logger.log(<level>, <message>) or
- logger.info(m)
- logger.warning(m)
- logger.error(m)
*/

const myFormat = printf(({ level, message, timestamp }) => {
  return `${level_label[level]}  ${timestamp}:  ${message}`;
});

const level_label = { 
  'error': '🚫', 
  'warn': '⚠️', 
  'info': '🗒️', 
  'http': '🌐',
  'verbose': '👋', 
  'debug': '🐛', 
  'silly': '🤡' 
}

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: combine(
      timestamp(),
      myFormat
    ),
});

module.exports = logger;

