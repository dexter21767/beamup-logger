var winston = require('winston');
require('winston-daily-rotate-file');

const path = require('path');

const dir = path.join(process.cwd(),'/logs');

const { combine, timestamp, printf } = winston.format;

class logs {
  constructor(maxFiles){
    if(!maxFiles){
      this.maxFiles = '1d';
    } else if(maxFiles == 0){
      this.maxFiles = null
    }else{
      this.maxFiles = maxFiles;
    } 

    return this.log;
  }

  transports = [
    new winston.transports.DailyRotateFile({
      filename: 'combined-%DATE%.log',
      dirname: 'logs',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: this.maxFiles,
      createSymlink: true,
      symlinkName: 'combined.log',
    }),
    new winston.transports.DailyRotateFile({
      filename: 'error-%DATE%.log',
      dirname: 'logs',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: this.maxFiles,
      level: 'error',
      createSymlink: true,
      symlinkName: 'error.log',
    }),
  ]

  
  get format (){
    return printf(({ level, message, timestamp }) => {
  
      timestamp = new Date(timestamp).toTimeString().split(' ')[0];
      return `'${timestamp}' ${level}: ${message}`;
    });
  }
  
  
  get log() { 
    return winston.createLogger({
      format: combine(
        timestamp(),
        this.format
      ),
      transports: this.transports
    });
}

}

/*
var transports = [
  new winston.transports.DailyRotateFile({
    filename: 'combined-%DATE%.log',
    dirname: 'logs',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: false,
    maxSize: '20m',
    maxFiles: '14d',
    createSymlink: true,
    symlinkName: 'combined.log',
  }),
  new winston.transports.DailyRotateFile({
    filename: 'error-%DATE%.log',
    dirname: 'logs',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: false,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'error',
    createSymlink: true,
    symlinkName: 'error.log',
  }),
]

const path = require('path');
const dir = path.join(process.cwd(),'/logs');
const findRemoveSync = require('find-remove');

transports[0].on('rotate', function(oldFilename, newFilename) {
  findRemoveSync(dir, {extensions:".log",age: {seconds: 3600}});
});


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
});*/

module.exports= logs;