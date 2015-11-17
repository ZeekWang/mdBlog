var Fs = require("fs"),
    Walk = require('walk'),
    Path = require('path'),
    Render = require("./render.js")
    MarkdownConverter = require("./markdown-converter.js")
    Constant = require("./constant.js")
    Post = require("./model/post.js")

var postFiles = [],
    pageFiles = [],
    posts = [],
    pages = [];

var inPath = Constant.path.blog, outPath = Constant.path.site;

function walk(path, files) {
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
    for (var i = 0; i < postFiles.length; i++) {
        var inFileName = postFiles[i];
        var post = new Post();
        var d = post.load(inFileName);
        d.inFileName = inFileName;
        d.outFileName = getOutputFileName(inFileName, inPath, outPath);
        posts.push(d);
    }
    for (var i = 0; i < pageFiles.length; i++) {
        var inFileName = pageFiles[i];
        // var post = new Post();
        // TODO  
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
    console.log(outFileName);
    Fs.writeFileSync(outFileName, html);
}

function produceIndex() {
    var html = Render.renderIndex("");
    writeHtmlFile(outPath + "/index.html", html);
}

function producePosts() {
    var converter = new MarkdownConverter();
    for (var i in posts) {
        var post = posts[i];
        var markedContentHtml = converter.convert(post.body);
        var html = Render.renderPost(post, markedContentHtml);
        writeHtmlFile(post.outFileName, html);
        console.log("output:" + post.outFileName);
    }
}

function produce() {
    walk( Path.join(Constant.path.blog, Constant.path.postDir), postFiles );
    walk( Path.join(Constant.path.blog, Constant.path.pageDir), pageFiles );
    console.log(postFiles)
    loadData();
    produceIndex();
    producePosts();
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