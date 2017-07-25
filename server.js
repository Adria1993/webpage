var http = require('http'),
  swig = require('swig'),
  FileManagement = require('./class/FileManagement'),
  listToCompile = ['./templates/index.html',"./templates/styles.html","./templates/projects.html"],
  open = require('open');

const fileman = new FileManagement();


function compileFiles(list){
  var promises = [];
  list.forEach((x) => {
    var template = swig.compileFile(x);
    var rendered = template(fileman.readJson());
    if(x == "./templates/styles.html"){
      rendered = rendered.replace(/<[^>]*>/g,"");
      var path = `${__dirname}/css/styles.css`;
      promises.push(fileman.writeFile(path, rendered));
    }else{
      var path = `${__dirname}/html/${x.split("/")[2]}`;
      promises.push(fileman.writeFile(path, rendered));
    }
  });
  Promise.all(promises).then((x) => {
    open("./html/projects.html", "firefox");
  })
}

compileFiles(listToCompile);


// http.createServer(function (req, res) {
//   var tmpl = swig.compileFile(__dirname + '/templates/index.html'),
//   renderedHtml = tmpl(fileman.readJson());
//   renderCSS();
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.end(renderedHtml);
// }).listen(1337);
//
// function renderCSS(){
//   var template = swig.compileFile("./templates/styles.html");
//   var rendered = template(new FileManagement().readJson());
//   rendered = rendered.replace(/<[^>]*>/g,"");
//
// }
// console.log('Application Started on http://localhost:1337/');
