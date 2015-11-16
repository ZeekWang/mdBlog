var Marked = require('marked'),
    Fs = require("fs"),
    Walk = require('walk'),
    Path = require('path')

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
    this.convert = function(mdText) {
        var html = Marked(mdText);
        return html;
    }
}