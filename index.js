#! /usr/bin/env node
const { spawn } = require('child_process');
const pkg = require('./util/package.js');

const command = process.argv[2];
const option1 = process.argv[3];
const option2 = process.argv[4];
const option3 = process.argv[5];

const clone = require('./commands/clone.js');
const help = require('./commands/help.js');
const init = require('./commands/init.js');
const update = require('./commands/update.js'); 
const checkForUpdates = require('./util/checkForUpdates.js');

if (!command || command.match(/[<>:"\/\\|?*\x00-\x1F]/)) {
  return console.log(`
  Invalid command name.
  Usage: emz <command-name>  

Run emz -h, help to view all available commands and options
`);
}

const runCommand = (command, args, options = undefined) => {
  const spawned = spawn(command, args, options);
  return new Promise((resolve) => {
    spawned.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    
    spawned.stderr.on('data', (data) => {
      console.error(data.toString());
    });
    
    spawned.on('close', () => {
      resolve();
    });
  });
}

(async () => {

switch(command){

case "--clone":
case "-c":
case "clone":
clone(option1, option2, runCommand);
break;

case "--clone":
case "-h":
case "help":
help(option1, option2, runCommand);
break;

case "--init":
case "-i":
case "init":
init(option1, option2, runCommand);
break;


case "--update":
case "-u":
case "update":
update(option1, option2, runCommand);
break;


case "checkForUpdates":
case "--latest":
case "-l":
checkForUpdates();
break;

    default: 
        console.log(`
        Unknown Command
    `);
}
})()


