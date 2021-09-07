const fs = require('fs');


function get(){
if(!fs.existsSync('./emz.json'))return;
const fileData = JSON.parse(fs.readFileSync('./emz.json'));
  return fileData;
}

function set(path, data){
if(!fs.existsSync('./emz.json'))return;
const packages = JSON.parse(fs.readFileSync('./emz.json')).packages;
if(!packages)return;
if(data && path){
    packages.push({
        "package_name": data.package_name || "Unknown",
        "path": path,
        "description": data.description || "No Description",
        "version": data.version || "0",
        "repoURL": data.repoURL || "No Github Repository",
        "cloneURL": data.cloneURL 
    })
    fs.writeFileSync('./emz.json', JSON.stringify({ "packages": packages }, null, 2));
}
}

module.exports = { get, set }
