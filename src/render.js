var Swig = require("swig")
    Constant = require("./constant.js")
    Config = require("./config.js")
    Fs = require("fs")

var renderIndex = function(data) {
    var template = Constant.template.index;
    var tpl = Swig.compileFile(template);
    var html =  tpl({ config: Config })
    return html;
}

var renderBlog = function(contentHtml) {
    var template = Constant.template.blog;
    var tpl = Swig.compileFile(template);
    var html =  tpl({ config: Config, contentHtml: contentHtml })
    return html;
}

exports.renderIndex = renderIndex;
exports.renderBlog = renderBlog;