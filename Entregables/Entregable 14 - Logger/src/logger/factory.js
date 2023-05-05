import { enviroment } from "../config/enviroment.config.js";
import {devLogger} from './dev.logger.js';
import {prodLogger} from './prod.logger.js';

console.log(enviroment)

const logger = (enviroment === 'development') ? devLogger : prodLogger;

export {logger}