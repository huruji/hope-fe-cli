#!/usr/bin/env node
const program = require('commander');
const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;
const printHelp = require('./help').printHelp;

program
  .version(require('./../package.json').version,'-v, --version')
  .on('--help', () => printHelp())
  .option('fe <project>', 'init a front end project')
  .option('project <project>', 'init a hope project')
  .parse(process.argv);

if(program.fe) {
  const child = spawn('node',[path.join(__dirname,'fe.js'), program.fe], {cwd:process.cwd(),stdio: 'inherit'});
}
if(program.project) {
  const child = spawn('node', [path.join(__dirname, 'project.js'), program.project], {cwd: process.cwd(), stdio: 'inherit'});
}