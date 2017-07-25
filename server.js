var http = require('http'),
  swig = require('swig'),
  FileManagement = require('./class/FileManagement'),
  listToCompile = [{"src":"./templates/index.html", "type":"html", "name": "index"},
  {"src": "./templates/styles.html", "type": "css", "name": "styles"},
  {"src": "./templates/projects.html", "type": "html", "name":"projects" },
  {"src": "./templates/imageModal.html", "type": "css", "name": "imageModal"}],
  open = require('open');

const fileman = new FileManagement();

function compileFiles(list){
  var dir = ['./html/', './css/'];
  dir.forEach((x) => {
    fileman.createFolder(x);
  });
  var promises = [];
  list.forEach((x) => {
    var template = swig.compileFile(x.src);
    var rendered = template(fileman.readJson());
    promises.push(saveFile(x, rendered));
  });
  Promise.all(promises).then((x) => {
    open("./html/projects.html", "firefox");
  });
}
function saveFile(x, rendered){
  var path = `${__dirname}/${x.type}/${x.name}.${x.type}`;
  if(x.type == "css"){
    rendered = rendered.replace(/<[^>]*>/g,"");
  }
  return fileman.writeFile(path, rendered);
}

compileFiles(listToCompile);
