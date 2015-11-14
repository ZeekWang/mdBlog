var Marked = require('marked'),
    Fs = require("fs"),
    Walk = require('walk'),
    Path = require('path'),

module.exports = function(){
    this.options = {
        renderer: new Marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
    }
    this.setOptions = function(options) {
        this.options = _.extend(this.options, options);
    }
    this.convert = function(inPath, outPath) {
        var files = [];
        function walk() {
            var walkerOptions = {
                followLinks: true,
                listeners: {
                    file: function (root, fileStats, next) {
                        var name = Path.join(root, fileStats.name);
                        if (Path.extname(name) == ".md") {
                            files.push(name);
                        }
                        next();
                    }
                }
            }
            var walker = Walk.walkSync(inPath, walkerOptions);            
        }

        function convertToHtml() {
            files.forEach(function(name) {
                var contentText = Fs.readFileSync(name,'utf-8');
                var html = Marked(contentText);
                var outFileName = Path.join(outPath, Path.relative(inPath, name))
                outFileName = outFileName.replace(".md", ".html");
                if ( Fs.existsSync(Path.dirname(outFileName)) == false ) {
                    Fs.mkdirSync(Path.dirname(outFileName));
                }
                Fs.writeFileSync(outFileName, html);
            });            
        }

        walk();
        convertToHtml();

    }
    return this;
}