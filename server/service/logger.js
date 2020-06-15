const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')
const moment = require('moment')

const { log } = require('../config')

const { IS_ONLINE } = process.env // pm2.json配置文件里提供的env环境变量

const timestamp = function () {
  return moment().format('YYYY-MM-DD HH:mm:ss.SSS')
}

const consoleTransport = new (winston.transports.Console)({
  prettyPrint: true,
  colorize: true,
  level: 'info'
})

const infoFileTransport = new (DailyRotateFile)({
  name: 'info-file',
  level: 'info',
  prettyPrint: true,
  timestamp,
  json: false,
  dirname: log.path,
  filename: 'developer.all.log',
  maxsize: 1024 * 1024 * 100, // 100MB
  maxFiles: 1,
  datePattern: '.HH'
})

const errorFileTransport = new (DailyRotateFile)({
  name: 'error-file',
  level: 'error',
  prettyPrint: true,
  timestamp,
  json: false,
  dirname: log.path,
  filename: 'developer.error.log',
  maxsize: 1024 * 1024 * 100, // 100MB
  maxFiles: 1,
  datePattern: '.HH'
})

// https://github.com/winstonjs/winston/blob/master/docs/transports.md
const transports = IS_ONLINE === '1'
  ? [infoFileTransport, errorFileTransport] // 线上输出日志文件
  : [consoleTransport] // 开发环境在控制台输出

const logger = winston.createLogger({ transports })

module.exports = logger
