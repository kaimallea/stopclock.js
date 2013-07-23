module.exports = function(grunt) {
    grunt.initConfig({
        jasmine: {
            stopclock: {
                src: ['stopclock.js'],
                options: {
                    specs:   'tests/spec/*.js',
                    version: '1.3.1'
                }
            },

            stopclockmin: {
                src: ['stopclock.min.js'],
                options: {
                    specs:   'tests/spec/*.js',
                    version: '1.3.1'
                }
            }
        },

        uglify: {
            min: {
                files: {
                    'stopclock.min.js': ['stopclock.js']
                }
            }
        },

        jshint: {
            all: ['Gruntfile.js', 'stopclock.js', 'tests/spec/**/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['jshint', 'uglify', 'jasmine']);
};
