const fs = require('fs');
const chalk = require('chalk');
const axios = require('axios');
const update = async (option1, option2, runCommand) => {
    if(fs.existsSync(`./emz.json`)){
       
    }else {
        console.log(chalk`
           {bold Couldn't find emz config file} - {grey.bold create one: emz init}
        `)
    }
}

module.exports = update;
