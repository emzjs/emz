const get = async(option1, option2, runCommand) => {
const axios = require('axios');
const chalk = require('chalk');
const fs = require('fs');
const pkg = require('../util/package.js');
if (!option1) {
  return console.log(`
  Invalid package name.
  Usage: emz get <package-name> <directory>
`);
}
if (option2  && option2.match(/[<>:"\/\\|?*\x00-\x1F]/)) {
  return console.log(`
  Invalid directory name.
  Usage: emz get <package-name> <directory>
`);
}
try{
var library = option1.split('/')[1] ? option1.split('/')[0] : "";
const package_name = option1.split('/')[1] || option1;
var dependencies = [];
var config = {};
if(fs.existsSync(`./emz.json`))config = JSON.parse(fs.readFileSync('./emz.json'));
if(!option1 && !config?.library)return console.log(chalk`{red Error} - Please specify the package library`)
if(!package_name)return console.log(chalk`{red Error} - Please specify the package name`);
var cmdDir = config?.commandsDir;
if(cmdDir && !fs.existsSync(cmdDir))return console.log(chalk`{red This directory (${cmdDir}) does not exist}`);
const package_data = (await axios.get(`https://raw.githubusercontent.com/emzjs/packages/main/packages/${library ? library : config?.library}/${package_name}`)).data;
if(!package_data)return console.log(chalk`{red This package does not exist}`);
axios(`https://raw.githubusercontent.com/emzjs/packages/main/commands/${library ? library : config?.library}/${package_name}.js`)
  .then(async (code) => {
   return fs.writeFileSync(`./${cmdDir ? `${cmdDir}/` : ''} ${package_data?.package_name || 'unknown'}.js`, code?.data)
  }).then(() => {
    if(!config?.installDependencies)return;
    var pkgDependencies = package_data.dependencies;
    for(i in pkgDependencies) {
     if(dependencies.includes(i))return;
       dependencies.push(i)
    } 
    console.log('Installing dependencies...');
    return runCommand('npm', [`install`, `${dependencies.join(" ")}`]);
  }).then(() => {
   pkg.set(package_data?.package_name, package_data);
    console.log('Done! 🏁');
  });
}catch(e){
   if(e?.response?.status)return console.log(chalk`{red This package does not exist}`);
   return console.log(chalk`{red Something Went Wrong}`);
}
}

module.exports = get
