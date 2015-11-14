var _ = require("underscore")
    MarkdownConvert = require("./src/markdown-convert.js")
    Config = require("./src/config.js")
    Constant = require("./src/constant.js")
    Render = require("./src/render.js")
    Fs = require("fs")
    Walk = require('walk')
    Path = require('path')    

// console.log(CONFIG.url)
// console.log(CONSTANT.blogPath)

// var markdownConvert = new MarkdownConvert()
// markdownConvert.convert(CONSTANT.blogPath, CONSTANT.sitePath);

Render.render("blog/node.md", "site/index.html", "views/index.html");
