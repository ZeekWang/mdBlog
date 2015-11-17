module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    var DEV = "dev";

    // grunt.mkdir(outputDir)

    grunt.initConfig({
        bower: {
            dev: {
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
            }
        },
        watch: {
            options: {
                spawn: false
            },            
            dev: {
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

    grunt.registerTask(DEV, ["bower:" + DEV, "shell:compile", "copy:" + DEV]);
    grunt.registerTask("compile", ["less:compile", "shell:compile"]);

}