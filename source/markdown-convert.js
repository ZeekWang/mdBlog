var marked = require('marked'),
    fs = require("fs")

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});


fileName = "node.md";
var contentText = fs.readFileSync("../blog/" + fileName,'utf-8');

html = marked(contentText);

fileName = fileName.replace(".md", ".html");
console.log(fileName);

fs.writeFile("../site/" + fileName, html);