import winston from 'winston'
import { customLevels } from '../utils/logger/customLevels.js'

const prodLogger = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevels.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: './logs/errors.log',
      level: 'debug',
      format: winston.format.simple(),
    }),
  ],
})

export {prodLogger}
