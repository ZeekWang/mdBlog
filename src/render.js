var Swig = require("swig")
    Config = require("./config.js")
    Fs = require("fs")

var render = function(inMd, outHtml, template) {
    var tpl = Swig.compileFile(template);
    var html =  tpl({ config: Config })
    if ( Fs.existsSync(Path.dirname(outHtml)) == false ) {
        Fs.mkdirSync(Path.dirname(outHtml));
    }
    Fs.writeFileSync(outHtml, html);   
}

exports.render = render;