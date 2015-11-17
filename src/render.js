var Swig = require("swig")
    Constant = require("./constant.js")
    Config = require("./config.js")
    Fs = require("fs")

Swig.setDefaults({
    autoescape: false
});

var renderIndex = function(data, page, totalPage) {
    var template = Constant.template.index;
    var tpl = Swig.compileFile(template);
    var html =  tpl({ config: Config, data: data, page: page, totalPage: totalPage })
    return html;
}

var renderPost = function(data, contentHtml) {
    var template = Constant.template.post;
    var tpl = Swig.compileFile(template);
    var html =  tpl({ config: Config, data: data, contentHtml: contentHtml })
    return html;
}

exports.renderIndex = renderIndex;
exports.renderPost = renderPost;