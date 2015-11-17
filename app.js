var _ = require("underscore")
    SiteProducer = require("./src/site_producer.js")
    MarkdownConverter = require("./src/markdown-converter.js")
    Config = require("./src/config.js")
    Constant = require("./src/constant.js")
    Render = require("./src/render.js")
    Fs = require("fs")
    Walk = require('walk')
    Path = require('path')    

// console.log(CONFIG.url)
// console.log(CONSTANT.blogPath)

var markdownConverter = new MarkdownConverter();
// markdownConvert.convert(CONSTANT.blogPath, CONSTANT.sitePath);

// Render.render("blog/node.md", "site/index.html", "views/index.html");

SiteProducer.produce(Constant.blogPath, Constant.sitePath);

// var fileContent = Fs.readFileSync("blog/node.md",'utf-8');
// console.log(fileContent);