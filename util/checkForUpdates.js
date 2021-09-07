const checkForUpdates = () => {
    const package = require('../../package.json');
const axios = require('axios');
const chalk = require('chalk');
const { boxConsole } = require('./boxConsole.js');
 axios.get('https://registry.npmjs.com/emz')
			.then(res => {
                const latestVersion = res.data['dist-tags'].latest;
                const version = require('./../package.json').version;
                if(version < latestVersion){
                    boxConsole([chalk`Update Available {grey ${version}} → {green ${latestVersion}}`, chalk`Run {cyan npm i -g emz@latest} To Update`])
                }else {
                  console.log(chalk`
    {green You're Using The Latest Version Of} {magenta emz} {blue (${latestVersion})}
                  `)
  
                }
			}).catch(err => {
       console.log(chalk`
       {red Something Went Wrong When We Try To Fetch The Registry}
       `)
            })
	
}

module.exports = checkForUpdates;
