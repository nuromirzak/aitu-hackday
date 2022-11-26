const express = require('express');
const port = process.env.PORT || 8000;
const app = express();
const winston = require('winston');
const fs = require('fs');
const path = require('path');
const DailyRotateFile = require('winston-daily-rotate-file');
const {format} = require("winston");
const {combine, timestamp, label, printf, prettyPrint} = format;
const errorLogTransport = require('./errorLogTransport');
const infoLogTransport = require('./infoLogTransport');
const exceptionLogTransport = require('./exceptionLogTransport');

const logger = winston.createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        prettyPrint()
    ),
    transports: [
        //
        // - Write all logs with importance level of `error` or less by errorLogTransport
        // - Write all logs with importance level of `info` or less by infoLogTransport
        //
        errorLogTransport,
        infoLogTransport
    ],
    exceptionHandlers: [
        exceptionLogTransport
    ],
    exitOnError: false, // do not exit on handled exceptions
});

module.exports = logger;