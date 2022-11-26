const winston = require('winston');
const winstonDailyRotateFile = require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');
const rotateLogs = require('./rotateLogs');

const infoLogTransport = new winstonDailyRotateFile({
    filename: 'logs/info-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    maxSize: 1024 * 1024, // 1MB
    maxFiles: 10,
    level: 'info',
    zippedArchive: true, // We want to zip the rotated log files
});

infoLogTransport.on('rotate', rotateLogs);

module.exports = infoLogTransport;
