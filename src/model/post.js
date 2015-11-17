var Fs = require("fs")
    JsonFm = require("json-front-matter")
    Config = require("../config.js")

// {
//     body: String
//     attrs: {
//         date: DateTime,
//         author: String,
//         title: String,
//         tags: Array(String),
//         category: String,
//         status: String (publish/draft),
//     }
// }

module.exports = function(){
    this.data = {
        body: "",
        attrs: {
            date: new Date(),
            author: Config.author,
            title: "<span style='color:red'>Empty Title</span>",
            tags: [],
            category: "",
            status: "publish"            
        }
    };
    this.load = function(inFileName) {
        var fileContent = Fs.readFileSync(inFileName,'utf-8');
        var contents = JsonFm.parse( fileContent );
        this.setAttrs(contents.attributes);
        this.data.body = contents.body;
        return this.data;
    }
    this.setAttrs = function(attrs) {
        if (attrs.date != null && isNaN(new Date(attrs.date)) == false)
            this.data.attrs.date = new Date(attrs.date);
        if (attrs.author != null)
            this.data.attrs.author = attrs.author + "";
        if (attrs.title != null)
            this.data.attrs.title = attrs.title + "";
        if (attrs.tags != null && attrs.tags.constructor == Array) {
            for (var i in attrs.tags)
                this.data.attrs.tags.push(attrs.tags[i] + "");
        }
        if (attrs.category != null)
            this.data.attrs.category = attrs.category + "";
        if (attrs.status != null) {
            var s = attrs.status + "";
            if (s == "publish" || s == "draft")
                this.data.attrs.status = s;
        }
    }
}