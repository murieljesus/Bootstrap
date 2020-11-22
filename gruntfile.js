module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });
    grunt.initConfig({
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*scss'],
                    dest: 'css',
                    ext: '.css'

                }]
            }
        },
        watch: {
            files: ['css/*.scss'],
            tasks: ['css']
        },
        browserSync: {
            dev: {
                bsFiles: { //browser files
                    src: [
                        'css/*.css',
                        '*.html',
                        '*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './' //directorio base para nuestro sevidor,

                    }
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: 'images/*.jpg',
                    dest: 'dist/images'

                }]
            }
        },
        copy: {
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            },
        },
        clean: {
            build: {
                src: ['dist/']
            }
        },
        cssmin: {
            dist: {}
        },
        uglify: {
            dist: {}
        },
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                lenght: 20
            },
            release: {
                files: [{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css',
                    ]
                }]
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {}
        },
        useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['index.html', 'about.html', 'price.html', 'contact.hml']
            },
            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function(context, block) {
                                var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0,
                                    rebase: false
                                }
                            }
                        }]
                    }
                }
            }
        },
        usemin: {
            html: ['dis/index.html', 'dis/about.html', 'dis/price.html', 'dis/contact.html'],
            options: {
                assetsDir: ['dist', 'dist/css', 'dist/js']
            }
        }

    });
    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('img:compress', ['imagemin']);
    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'uglify',
        'filerev',
        'usemin'
    ])
};