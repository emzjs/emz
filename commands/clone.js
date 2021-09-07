const clone = async(option1, option2, runCommand) => {
const axios = require('axios');
const chalk = require('chalk');
const fs = require('fs');
const pkg = require('../util/package.js');
if (!option1 || option1.match(/[<>:"\/\\|?*\x00-\x1F]/)) {
  return console.log(`
  Invalid project name.
  Usage: emz clone <project-name> <directory>
`);
}
if (!option2 || option2.match(/[<>:"\/\\|?*\x00-\x1F]/)) {
  return console.log(`
  Invalid directory name.
  Usage: emz clone <project-name> <directory>
`);
}
if(fs.existsSync(`./${option2}`))return console.log(chalk`{red Error} - Destination path '${option2}' already exist`)
try{
const response = await axios.get(`https://raw.githubusercontent.com/emzjs/packages/main/packages/${option1}`);
const data = response.data;
if(!data)return console.log('Couldn\'t Find This Project ID In Our Database');
runCommand('git', ['clone', data.cloneURL, option2 || data.package_name ])
  .then(() => {
    return runCommand('rm', ['-rf', `${option2}/.git`]);
  }).then(() => {
    console.log('Installing dependencies...');
    return runCommand('npm', ['install'], {
      cwd: process.cwd() + '/' + option2
    });
  }).then(() => {
    pkg.set(option2 || data.package_name, data);
    console.log('Done! 🏁');
  });
}catch(e){
 return console.log('Couldn\'t Find This Project In Our Database')
}
}

module.exports = clone
