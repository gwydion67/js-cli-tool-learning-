#!/usr/bin/env node

// const arg = require('arg');
// const chalk = require('chalk');
import arg from 'arg';
import chalk from 'chalk';
// import { join } from 'path';

import { createRequire } from 'module';
import { pkgUp, pkgUpSync } from 'pkg-up';
const require = createRequire(import.meta.url);

// console.log(process.argv)
// console.log('hello tool');

// const pkg = await import(join(process.cwd(),'./package.json'), { assert: { type: 'json' } });

try{
  const args = arg({
    '--start': Boolean,
    '--build': Boolean,
  });
  // console.log(args);
  
  if (args['--start']) {
    // const pkg =  require(join(process.cwd(), './package.json'));
    const pkgpath = pkgUpSync({cwd: process.cwd()});
    const pkg = require(pkgpath);
    console.log(pkg) 
    if(pkg.tool){
      console.log('Found Configuration', pkg.tool);
      
    }else {
      console.log(chalk.yellow('could not find a Configuration using default'))
    }

    console.log(chalk.cyan('starting the app'));
  }
} catch (e){
  console.log(chalk.yellow(e.message, '\n'));
  usage()
}


function usage() {
  console.log(`tool [CMD] 
    --start\tStarts the app
    --build\tBuilds the app`);
};
