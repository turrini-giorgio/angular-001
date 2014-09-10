module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-wiredep');

 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 3000,
                    base: './'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            html: {
                files: ['index.html', 'app/**/*.html']
            },
            js: {
                files: ['app/**/*.js'],
                tasks: []
            },
            css: {
                files: ['app/css/*.css'],
                tasks: []
            }
        },
        open: {
            dev: {
                path: 'http://localhost:3000/index.html'
            }
        },
        wiredep: {
            target: {
                // Point to the files that should be updated when
                // you run `grunt wiredep`
                src: [ 'index.html' ],
                // Optional:
                // ---------
                cwd: '',
                dependencies: true,
                devDependencies: false,
                exclude: [],
                fileTypes: {},
                ignorePath: '',
                overrides: {}
            }
        }
    });
 
    grunt.registerTask('default', ['wiredep', 'connect', 'open', 'watch']);
 
}
