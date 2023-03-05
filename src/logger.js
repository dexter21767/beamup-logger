var winston = require('winston');
require('winston-daily-rotate-file');

var transports = [
  new winston.transports.DailyRotateFile({
    filename: 'combined-%DATE%.log',
    dirname: "logs",
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: false,
    maxSize: '20m',
    maxFiles: '14d',
    createSymlink: true,
    symlinkName: 'combined.log',
  }),
  new winston.transports.DailyRotateFile({
    filename: 'error-%DATE%.log',
    dirname: "logs",
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: false,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'error',
    createSymlink: true,
    symlinkName: 'error.log',
  }),
]

const { combine, timestamp, printf } = winston.format;

const myFormat = printf(({ level, message, timestamp }) => {

  timestamp = new Date(timestamp).toTimeString().split(' ')[0];
  return `'${timestamp}' ${level}: ${message}`;
});

var log = winston.createLogger({
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: transports
});


module.exports= log;