module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        jasmine: {
            src: 'src/**/*.js',
            options: {
                specs: 'spec/*Spec.js',
                helpers: 'spec/*Helper.js'
            }
        },
        jshint: {
            src: [
                'Gruntfile.js',
                'src/*.js',
                'spec/*.js'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).
    grunt.registerTask('default', ['uglify','jasmine','jshint']);

};
