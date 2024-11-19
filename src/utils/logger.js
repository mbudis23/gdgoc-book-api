const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
        })
    ),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '14d',
        })
    ],
});

exports.addLog = (req, res, next) => {
    const clientIp = req.clientIp || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const method = req.method;
    const url = req.originalUrl;

    // Log request saat selesai (dengan status)
    res.on('finish', () => {
        const status = res.statusCode;
        const logMessage = `IP: ${clientIp} - Method: ${method} - URL: ${url} - Status: ${status}`;
        logger.info(logMessage); // Log dengan level "info"
    });

    next();
};