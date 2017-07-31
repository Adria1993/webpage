const fs = require('fs');
var ncp = require('ncp').ncp;
ncp.limit = 16;

const path = "./json/bdd.json";
var FileManagement = function(){

}

FileManagement.prototype.readJson = function () {
  var ar = fs.readFileSync(path);
  return JSON.parse(ar);
};

FileManagement.prototype.writeFile = function (path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', (error, success) => {
      if(error){
        reject(error);
      }
      resolve(true);
    })
  });
};
FileManagement.prototype.createFolder = function (folder) {
  if (!fs.existsSync(folder)){
    fs.mkdirSync(folder);
  }
};

FileManagement.prototype.copyFile = function (source, target) {
  return new Promise((resolve, reject) => {
    ncp(source, target, function (err) {
     if (err) {
       reject(err);
     }
      resolve(`${source} folder copied`);
    });
  });
}
module.exports = FileManagement;
