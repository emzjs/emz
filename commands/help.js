const chalk = require('chalk');
const help = (option1, option2, runCommand) => {
  switch(option1){
      default: 
      console.log(chalk`
        {blue.bold emz} - {green.bold Clone a project template all around the world}

        {yellow.underline.bold Usage}: 
         emz <command> <option1>

        {yellow.underline.bold Options}: 
         -h, --help     See a list of commands, options available 
         -c, --clone    Clone A Project Template
         -i, --init     Setup A Config File
         -l, --latest   Check For Updates

        {yellow.underline.bold Commands}: 
         help       Help Command
         clone      Clone A Project Template
         init       Setup A Config File

        {green.underline.bold Links}:
         Github Repository   {grey https://github.com/emzjs/emz}
      `)
  }
}

module.exports = help;
