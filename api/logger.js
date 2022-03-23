
const winston = require('winston');

module.exports.logger = winston.createLogger({
    transports: [
        // new winston.transports.Console({
        //     level: 'info',
        //     json: true,
        //     format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        // }),
        // new winston.transports.Console({
        //     level: 'error',
        //     json: true,
        //     format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        // }),
        new winston.transports.Console({
            level: 'debug',
            json: true,
            format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        }),
    ] 
});