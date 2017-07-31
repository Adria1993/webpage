var http = require('http'),
  swig = require('swig'),
  FileManagement = require('./class/FileManagement'),
  listToCompile = [{"src":"./templates/index.html", "type":"html", "name": "index"},
  {"src": "./templates/styles.html", "type": "css", "name": "styles"},
  {"src": "./templates/projects.html", "type": "html", "name":"projects" },
  {"src": "./templates/imageModal.html", "type": "css", "name": "imageModal"},
  {"src": "./templates/contacts.html", "type": "html", "name":"contacts" },
  {"src": "./templates/contacts.css", "type": "css", "name": "contacts"}],
  open = require('open');

const fileman = new FileManagement();
fileman.createFolder('./build/');
function compileFiles(list){
  var build = ['./build/html','./build/css','./build/js','./build/image','./build/fancybox'];
  build.forEach((x) => {
    fileman.createFolder(x);
  });
  var promises = [];
  list.forEach((x) => {
    var template = swig.compileFile(x.src);
    var rendered = template(fileman.readJson());
    promises.push(saveFile(x, rendered));
  });
  var requiredFolders = ['./js', './image', './fancybox'];
  requiredFolders.forEach((x) => {
    var route = `./build/${x.replace("./","")}`;
    fileman.copyFile(x, route).then((x) => {
      console.log(x);
    })
  });
  Promise.all(promises).then((x) => {
    open("./build/html/index.html", "firefox");
  });
}
function saveFile(x, rendered){
  var path = `${__dirname}/build/${x.type}/${x.name}.${x.type}`;
  if(x.type == "css"){
    rendered = rendered.replace(/<[^>]*>/g,"");
  }
  return fileman.writeFile(path, rendered);
}

compileFiles(listToCompile);
