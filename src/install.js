const program = require('commander');
const printHelp = require('./help').printHelp;
const join = require('path').join;
const existsSync = require('fs').existsSync;
const vfs = require('vinyl-fs');
const which = require('which');
const spawn = require('child_process').spawn;
const chalk = require('chalk');


function findSource() {
  const downSources = ['cnpm', 'npm'];
  for(let i = 0; i < downSources.length; i++) {
    try{
      which.sync(downSources[i]);
      console.log('use npm: ' + downSources[i]);
      return downSources[i]
    } catch(e) {

    }
  }
  throw new Error('please install npm');
}

function install(cwd, cb) {
  const npm = findSource();
  const child = spawn(which.sync(npm), ['install'], {cwd:cwd, stdio: 'inherit'});
  child.on('close', function(code) {
    console.log();
    console.log('node modules install end');
    console.log();
    console.log(chalk.italic.green('hoper, just happy hacking'));
    cb && cb();
  })
}

module.exports = install;