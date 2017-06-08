module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      dist: {
        options: {

        },
        files: {
          'dist/main.css': 'components/**/sass/component.scss'
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
				files: '<%= sass.dist.files["dist/main.css"] %>',
				tasks: ['sass', 'postcss']
			},
			js: {
				files: '<%= uglify.dist.files["dist/main.js"] %>',
				tasks: ['uglify']
			},
      demo: {
        files: ['components/**/demo/**/*', 'demo/**/*'],
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

  grunt.registerTask('default', ['sass', 'postcss', 'uglify', 'execute']);
  grunt.registerTask('serve', ['sass', 'postcss', 'uglify', 'execute', 'connect', 'watch']);

};
