var _ = require("underscore")
    MarkdownConvert = require("./source/markdown-convert.js")

var markdownConver = new MarkdownConvert()
markdownConver.convert("./blog", "./site")

