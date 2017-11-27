import program from "commander";
import {printHelp, printLogo} from "./help";
import {join} from 'path';
import {existsSync, mkdirSync} from "fs";
import vfs from "vinyl-fs";
import install from "./install";
import chalk from "chalk";
import jsonfile from 'jsonfile';

program
  .parse(process.argv);

if(!program.args[0]) {
  console.log(program.args);
  printHelp();
} else {
  const dest = join(process.cwd(), program.args[0]);
  if(existsSync(dest)) {
    console.error('Existing directory here, please run new command for an empty folder!');
    process.exit(1)
  }
  mkdirSync(dest);
  printLogo();
  console.log(`Create a new sass-ui hope project in ${dest}`);
  console.log();
  vfs.src(['**/*'], {cwd: join(__dirname, '../templates/sass-demo'), cwdbase:true, dot: true})
    .pipe(vfs.dest(dest))
    .on('end', function() {
      const packageJson = join(dest, 'package.json');
      jsonfile.readFile(packageJson, function(err, obj) {
        obj.name = program.args[0];
        jsonfile.writeFile(packageJson, obj, function(err) {
          if(err) return console.log(err);
          console.info('finnished created floders and files ');
          install(join(process.cwd(), program.args[0]));
        })
      })
    });
}