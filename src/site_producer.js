var Fs = require("fs"),
    Walk = require('walk'),
    Path = require('path'),
    Render = require("./render.js")
    MarkdownConverter = require("./markdown-converter.js")
    Constant = require("./constant.js")

var files = [];
var blogs = [];
var pages = [];
var INPATH, OUTPATH;
function walk(path) {
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
    var walker = Walk.walkSync(path, walkerOptions);
}

function loadData() {
    for (var i = 0; i < files.length; i++) {
        var inFileName = files[i];
        var fileContent = Fs.readFileSync(inFileName,'utf-8');
        var d = {};
        d.mdText = fileContent;
        d.inFileName = inFileName;
        d.outFileName = getOutputFileName(inFileName, INPATH, OUTPATH);
        blogs.push(d);

        var re = new RegExp("(?:<!--)([\\s\\S]*?)(?:-->)", "i");
        var ma = fileContent.match(re);
        if (ma != null) {
            console.log(ma[1]);
            var setting = JSON.parse(ma[1]);
            console.log(setting);
            
        }

    }
}


function getOutputFileName(inFileName, inPath, outPath) {
    var outFileName = Path.join(outPath, Path.relative(inPath, inFileName))
    outFileName = outFileName.replace(".md", ".html");
    if ( Fs.existsSync(Path.dirname(outFileName)) == false ) {
        Fs.mkdirSync(Path.dirname(outFileName));
    }              
    return outFileName; 
}

function writeHtmlFile(outFileName, html) {
    Fs.writeFileSync(outFileName, html);
}

function produceIndex(outPath) {
    var html = Render.renderIndex("");
    writeHtmlFile(outPath + "/index.html", html);
}

function produce(inPath, outPath) {
    INPATH = inPath;
    OUTPATH = outPath;
    walk(inPath);
    console.log(files);
    loadData()
    produceIndex(outPath);
}

exports.produce = produce;


// module.exports = function(){
//     this.files = [];
//     this.produceIndex = function(inPath, outPath) {

//     }
//     this.produceBlogs = function(inPath, outPath) {
//         var files = [];




//         function convertToHtml() {
//             var converter = new MarkdownConverter();
//             files.forEach(function(inFileName) {
//                 var outFileName = getOutputFileName(inFileName);
//                 var mdText = Fs.readFileSync(inFileName,'utf-8');
//                 var markedContentHtml = converter.convert(mdText);

//                 Render.renderBlog("")
//                 Fs.writeFileSync(outFileName, html);
//             });            
//         }

//         walk();
//         convertToHtml();

//     }
//     return this;
// }