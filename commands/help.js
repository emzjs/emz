const chalk = require('chalk');
const help = (option1, option2, runCommand) => {
  switch(option1){
      default: 
      console.log(chalk`
        {blue.bold emz} - {green.bold Integrate Bot Commands}

        {yellow.underline.bold Usage}: 
         emz <command> <option1>

        {yellow.underline.bold Options}: 
         -h, --help     See a list of commands, options available 
         -g, --get      Clone a bot command
         -i, --init     Setup a config file
         -l, --latest   Check for updates

        {yellow.underline.bold Commands}: 
         help       Help Command
         get        Clone a bot command
         init       Setup a config file

        {green.underline.bold Links}:
         Github Repository   {grey https://github.com/emzjs/emz}
      `)
  }
}

module.exports = help;
