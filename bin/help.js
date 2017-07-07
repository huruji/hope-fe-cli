const readFileSync = require('fs').readFileSync;
const path = require('path');
const chalk = require('chalk');

function printHelp() {
  printLogo();
  console.log('  Commands:');
  console.log();
  console.log('     project [project]  init a full project');
  console.log();
  console.log('     fe [project]  init a front end project');
  console.log();
  console.log('  All commands can be run with -h (or --help) for more information.')
}

function printLogo() {
  const logo = readFileSync(path.join(__dirname, '../src/logo.txt')).toString();
  console.log();
  console.log(chalk.red(logo));
  console.log();
}

module.exports.printHelp = printHelp;
module.exports.printLogo = printLogo;