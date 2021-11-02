const fs = require('fs');
const chalk = require('chalk');
const axios = require('axios');
const update = async (option1, option2, runCommand) => {
const file = fs.existsSync(`./emz.json`)
    if(file){
       if(!option1){
        file?.packages?.forEach((e, i) => {
          if(!file.packages[i].version) return console.log(chalk`
            {red The Version Of ${file.packages[i]["package_name"] ? file.packages[i]["package_name"] : 'Unknown' } Was Undefined}
          `);
        })
       }else {
       
      }
    }else {
        console.log(chalk`
           {bold Couldn't find emz config file} - {grey.bold create one: emz init}
        `)
    }
}

module.exports = update;
