const program = require('commander');
const printHelp = require('./help').printHelp;
const printLogo = require('./help').printLogo;
const join = require('path').join;
const existsSync = require('fs').existsSync;
const mkdirSync = require('fs').mkdirSync;
const vfs = require('vinyl-fs');
const install = require('./install.js');
const chalk = require('chalk');
const jsonfile = require('jsonfile');

program
  .parse(process.argv);

if(!program.args[0]) {
  console.log(program.args);
  printHelp();
} else{
  const dest = join(process.cwd(), program.args[0]);
  if(existsSync(dest)) {
    console.error('Existing directory here, please run new command for an empty folder!');
    process.exit(1)
  }
  mkdirSync(dest);
  printLogo();
  console.log(`Create a new full hope project in ${dest}`);
  console.log();
  vfs.src(['**/*'], {cwd: join(__dirname, '../templates/project'), cwdbase:true, dot: true})
    .pipe(vfs.dest(dest))
    .on('end', function() {
      const packageJson = join(dest, 'Web', 'package.json');
      jsonfile.readFile(packageJson, function(err, obj) {
        obj.name = program.args[0];
        jsonfile.writeFile(packageJson, obj, function(err) {
          if(err) return console.log(err);
          console.info('finnished created floders and files ');
          install(join(process.cwd(), program.args[0], 'Web'));
        })
      });
    });
}