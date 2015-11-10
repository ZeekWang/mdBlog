module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    var DEV = "dev";

    grunt.initConfig({

        // "watch": {
        //     options: {
        //         spawn: false
        //     },            
        //     dev: {
        //         files: [],
        //         tasks: [DEV]
        //     },
        // },

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
        }        

    });

    grunt.loadNpmTasks('grunt-bower-task');
    // grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask(DEV, ["bower:" + DEV]);

}