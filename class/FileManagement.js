const fs = require('fs');
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

module.exports = FileManagement;
