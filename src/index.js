#!/usr/bin/env node
import program from 'commander';
import fse from 'fs-extra';
import fs from 'fs';
import {join} from 'path';
import {spawn} from 'child_process';
import {printHelp} from './help';

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