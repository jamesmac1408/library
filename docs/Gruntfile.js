module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
      },
      dist: {
        src: '_components/**/scss/component.scss',
        dest: 'assets/scss/main.scss'
      }
    },

    sass: {
      dist: {
        options: {},
        files: {
          'assets/css/main.css': 'assets/scss/main.scss'
        }
      },
      demo: {
        options: {
        },
        files: {
          'assets/demo-site/dist/css/site-styles.css': 'assets/demo-site/src/scss/*',
          'assets/demo-site/dist/css/demo-styles.css': '_components/**/demo/demo.scss'
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
        src: 'assets/css/main.css'
      },
      demo: {
        src: 'assets/demo-site/dist/css/site-styles.css',
        src: 'assets/demo-site/dist/css/demo-styles.css'
      }
    },

    uglify: {
      options: {
        
      },
      dist: {
        files: {
          'assets/js/main.js': ['_components/**/js/component.js']
        }
      },
      demo: {
        files: {
          'assets/demo-site/dist/js/main.js': ['_components/**/demo/demo.js', 'assets/demo-site/src/js/*']
        }
      }
    },

    jekyll: {
      options: {
        bundleExec: true
      },
      dist: {
        options: {}
      }
    },

    connect: {
			server: {
				options: {
					livereload: '9090',
          hostname: 'localhost',
					base: 'docs',
					port: 4000
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
				files: ['<%= concat.dist.src %>', '<%= sass.demo.files["assets/demo-site/dist/css/site-styles.css"] %>', '<%= sass.demo.files["assets/demo-site/dist/css/demo-styles.css"] %>'],
				tasks: ['concat', 'sass', 'postcss', 'jekyll']
			},
			js: {
				files: ['<%= uglify.dist.files["assets/js/main.js"] %>', '<%= uglify.demo.files["assets/demo-site/dist/js/main.js"] %>'],
				tasks: ['uglify', 'jekyll']
			},
      demo: {
        files: ['demo/**/*', '_components/**/*', '_layouts/**/*', '_includes/**/*', '_plugins/**/*', '_assets/css/*'],
        tasks: ['jekyll']
      }
		},
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat', 'sass', 'postcss', 'uglify', 'jekyll']);
  grunt.registerTask('serve', ['concat', 'sass', 'postcss', 'uglify', 'jekyll', 'connect', 'watch']);

};
