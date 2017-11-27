import {readFileSync} from 'fs';
import {join} from 'path';
import chalk from 'chalk';

export const printHelp = function() {
  printLogo();
  console.log('  Commands:');
  console.log();
  console.log('     project [project]  init a full project');
  console.log();
  console.log('     fe [project]  init a front end project');
  console.log();
  console.log('  All commands can be run with -h (or --help) for more information.')
};

export  const printLogo = function() {
  const logo = readFileSync(join(__dirname, '../src/logo.txt')).toString();
  console.log();
  console.log(chalk.red(logo));
  console.log();
};
