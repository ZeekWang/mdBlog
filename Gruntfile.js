var Constant = require("./src/constant.js")
    Path = require("path")

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    var DEV = "dev";
    var PRODUCT = "product";    

    grunt.task.registerTask("initialize", "init", function() {
        grunt.file.delete(Constant.path.blog, {force: true});
        grunt.file.delete(Constant.path.site, {force: true});
        grunt.file.mkdir(Constant.path.site);
        grunt.file.mkdir(Constant.path.blog);
        grunt.file.mkdir(Path.join(Constant.path.blog, Constant.path.postDir));
        grunt.file.mkdir(Path.join(Constant.path.blog, Constant.path.pageDir));
        grunt.file.mkdir(Path.join(Constant.path.blog, Constant.path.imgDir));
        grunt.file.copy("./src/config_template.js", "./src/config.js");
    })

    grunt.task.registerTask("clean_site", "clean site dir", function() {
        grunt.file.delete(Constant.path.site, {force: true});
        grunt.file.mkdir(Constant.path.site);
    })

    grunt.initConfig({
        bower: {
            "copy": {
                options: {
                    targetDir: './site/libs',
                    layout: 'byComponent',
                    install: true,
                    verbose: false,
                    cleanTargetDir: false,
                    cleanBowerDir: false,
                    bowerOptions: {}
                }                
            }
        },
        less: {
            compile: {
                files: {
                    './site/css/style.css': './assets/less/style.less'
                }
            }
        },          
        shell: {
            compile: {
                command: 'node app.js'
            }
        },
        copy: {
            dev: {
                files: [
                    { expand: true, cwd: "./assets/img/", src: "**/*", dest: "./site/img/"}, 
                    { expand: true, cwd: "./assets/css/", src: "**/*", dest: "./site/css/"},
                    { expand: true, cwd: "./assets/js/", src: "**/*", dest: "./site/js/"}
                ]
            },
            product: {
                files: [
                    { expand: true, cwd: "./assets/img/", src: "**/*", dest: "./site/img/"}, 
                    { expand: true, cwd: "./assets/css/", src: "**/*", dest: "./site/css/"},
                    { expand: true, cwd: "./assets/js/", src: "**/*", dest: "./site/js/"}
                ]
            },
        },
        watch: {
            options: {
                spawn: false
            },            
            dev: {
                files: ['**/*', '!node_modules/**', '!bower_components/**', '!site/**'],
                tasks: ["compile"]
            },
            product: {
                files: ['**/*', '!node_modules/**', '!bower_components/**', '!site/**'],
                tasks: ["compile"]                
            },
            resource: {
                files: ['./assets/**/*'],
                tasks: ["copy"]
            },            
        },
    });

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.oklns("watch file changed at " + new Date().toString());
    });    

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask("init", ["initialize"]);
    grunt.registerTask(DEV, ["bower:copy", "less:compile", "shell:compile", "copy:" + DEV]);
    grunt.registerTask(PRODUCT, ["clean_site", "bower:copy", "less:compile", "shell:compile", "copy:" + PRODUCT]);
    grunt.registerTask("compile", ["less:compile", "shell:compile"]);
    // grunt.registerTask("clean", ["clean_site"]);

}