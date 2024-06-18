import chalk from "chalk";
import debug from "debug";

export function createLogger(name) {
  return {
    log: (...args) => console.log(chalk.gray(...args)),
    warning: (...args) => console.log(chalk.yellow(...args)),
    hightlight: (...args) => console.log(chalk.cyanBright(...args)),
    debug: debug(name)
  };
}
