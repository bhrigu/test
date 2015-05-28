module.exports = function(grunt) {
    grunt.option('force',true);

    // setup
    grunt.initConfig({

        pkg:grunt.file.readJSON('package.json'),

        /**
         * Set Environment variables
         */

        env:{
            src:'./static',
            dest: './static'
        },

        /**
         * Generate CSS files
         */

        sass:{
            dev:{
                options:{
                    sourcemap: "--sourcemap=none",
                    style:'nested'
                },
                files:{
                    '<%= env.dest %>/css/screen.merged.css':'<%= env.src %>/scss/screen.scss'
                }
            }
        },

        /**
         * Minify CSS
         */

        cssmin:{
            dest:{
                files:{
                    '<%= env.dest %>/css/screen.merged.min.css':'<%= env.dest %>/css/screen.merged.css'
                }
            }
        },

        /**
         * Uglify Javascript
         */

        uglify:{
            options:{
                mangle:false,
                compress:false
            },
            all:{
                files:[{
                    expand:true,
                    cwd:'<%= env.dest %>',
                    src:'**/*.js',
                    dest:'<%= env.dest %>/js/min'
                }]
            }
        },

        /**
         * Clean
         */

        clean:{
            css:['<%= env.dest %>/css']
        },

        /**
         * Watch static files
         */

        watch:{
            sass:{
                files:['<%= env.src %>/**/*.scss'],
                tasks:[ "clean:css", 'sass:dev', "cssmin:dest"]
            }
        },

        /**
         * Remove source-maps reference from DEST css.
         */


        'string-replace': {
            sourcemaps: {
                files: {
                    '<%= env.dest %>/css/screen.prefixed.css':'<%= env.static %>/scss/screen.prefixed.css'
                },
                options: {
                    replacements: [{
                        pattern: /\/\*# sourceMappingURL=[a-zA-Z.]+.css.map \*\//,
                        replacement: ''
                    }]
                }
            }
        }
    });


    /**
     * Needs the following node modules
     */
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-string-replace');

    grunt.registerTask('watchSCSS',["clean:css", 'sass:dev', "cssmin:dest", 'watch']);
};