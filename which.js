/*
const which = require('which');

const a = which.sync('cffnpm');
console.log(a);*/


const spawn = require('child_process').spawn;

spawn('node', ['read.js'], {cwd: process.cwd(), stdio: 'inherit'});