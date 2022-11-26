const winston = require('winston');
const winstonDailyRotateFile = require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');
const rotateLogs = require('./rotateLogs');

const exceptionLogTransport = new winstonDailyRotateFile({
    filename: 'logs/exception-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    maxSize: 1024, // 1KB
    maxFiles: 10,
    zippedArchive: false, // We don't want to zip the rotated log files
});

exceptionLogTransport.on('rotate', rotateLogs);

module.exports = exceptionLogTransport;
