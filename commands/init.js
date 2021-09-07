const fs = require('fs');
const chalk = require('chalk');
const init = (option1, option2, runCommand) => {
if(!fs.existsSync(`./emz.json`)){
  fs.writeFileSync('emz.json', JSON.stringify({
      packages: []
  }), console.log(chalk`
  {grey.bold An emz config file was created}
  `))
}
try{
const data = JSON.parse(fs.readFileSync('./emz.json'))
if(!Array.isArray(data.packages)){
      fs.writeFileSync('emz.json', JSON.stringify({
      packages: []
  }), console.log(chalk`
  {grey.bold An emz config file was rewrote}
  `))
}
}catch(e){
  fs.writeFileSync('emz.json', JSON.stringify({
      packages: []
  }), console.log(chalk`
  {grey.bold An emz config file was rewrote}
  `))}

}

module.exports = init;
