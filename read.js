const readFile = require('fs').readFile;

readFile('./package.json', function(err,data) {
  console.log(data);
});

