module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
      },
      dist: {
        src: 'components/**/scss/component.scss',
        dest: 'dist/main.scss'
      },
      demo: {
        src: ['demo/css/base/base.scss', 'components/**/demo/scss/demo.scss'],
        dest: 'demo/css/main.scss'
      }
    },

    sass: {
      dist: {
        options: {},
        files: {
          'dist/main.css': 'dist/main.scss'
        }
      },
      demo: {
        options: {
        },
        files: {
          'demo/css/main.css': 'demo/css/main.scss'
        }
      }
    },

    postcss: {
      options: {
        map: false, 
        processors: [
          require('autoprefixer')({browsers: 'last 4 versions'}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'dist/main.css'
      },
      demo: {
        src: 'demo/css/main.css'
      }
    },

    uglify: {
      options: {
        
      },
      dist: {
        files: {
          'dist/main.js': ['components/**/js/component.js']
        }
      }
    },

    execute: {
        target: {
            src: ['demo/build.js']
        }
    },

    connect: {
			server: {
				options: {
					livereload: '9090',
          hostname: 'localhost',
					base: '.',
					port: 8080
				}
			}
		},

		watch: {
      options: {
        livereload: {
          host: 'localhost',
          port: 9090
        }
      },
			sass: {
				files: ['<%= concat.dist.src %>', '<%= concat.demo.src %>'],
				tasks: ['concat', 'sass', 'postcss']
			},
			js: {
				files: '<%= uglify.dist.files["dist/main.js"] %>',
				tasks: ['uglify']
			},
      demo: {
        files: ['components/**/*', 'demo/**/*'],
        tasks: ['execute']
      }
		},
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');


  grunt.registerTask('default', ['concat', 'sass', 'postcss', 'uglify', 'execute']);
  grunt.registerTask('serve', ['concat', 'sass', 'postcss', 'uglify', 'execute', 'connect', 'watch']);

};
