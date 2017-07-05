const program = require('commander');
const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;
const printHelp = require('./help').printHelp;

program
  .version(require('./../package.json').version,'-v, --version')
  .on('--help', () => printHelp())
  .option('i, sass-ui <project>', 'init a front end project')
  .parse(process.argv);

if(program.sassUi) {
  const child = spawn('node',[path.join(__dirname,'init.js'), program.sassUi], {cwd:process.cwd(),stdio: 'inherit'});
  /*const projectPath = path.join(process.cwd(), program.init);
  fse.mkdirs(projectPath)
    .then(()=>{
      const demoPath = path.join(path.dirname(__dirname), 'templates/sass-demo');
      fs.exists(demoPath,(exists) => {
        console.log(1111);
        if(exists) {
          console.log('exists');
          fse.copy(demoPath, projectPath, (err) => {
            if(err) {
              console.log(err)
            }
          })
        }
      })

    })
    .then(() => console.log('create project %s successful, just enjoy', program.init))
    .catch((err) => console.log(err));*/
}