import chalk from 'chalk';
// import { join } from 'path';
import { createRequire } from 'module';
// import { pkgUp, pkgUpSync } from 'pkg-up';
const require = createRequire(import.meta.url);
import { createLogger } from '../logger.js';
const logger = createLogger('config:mgr');
import { cosmiconfigSync } from 'cosmiconfig';
const configLoader = cosmiconfigSync('tool');

const schema = require('./schema.json');
import betterAjvErrors from 'better-ajv-errors'
const Ajv = require('ajv').default;
const ajv = new Ajv({jsonPointer: true});

export default function getConfig() {

  // const pkgpath = pkgUpSync({cwd: process.cwd()});
  // const pkg = require(pkgpath);
  // console.log(pkg) 
  // if(pkg.tool){
  //   console.log('Found Configuration', pkg.tool);

  // } else if (hasJSConfigFile()) {
  //   return loadJSConfigFile();
  // } else {
  //   console.log(chalk.yellow('could not find a Configuration using default'))
  //   return {port : 1234}
  // }
  
  const result = configLoader.search(process.cwd());
  if(!result) {
    logger.warning('could not find a Configuration using default');
    return {port : 1234}
  } else {
    const isValid = ajv.validate(schema, result.config);
    if(!isValid){
      logger.warning('Invalid config');
      console.log(betterAjvErrors(schema,result.config, ajv.errors));
      process.exit(1);
    }
    logger.debug('Found Configuration', result.config);
    return result.config;
  }

}
