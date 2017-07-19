const webpackConfig = require('./webpack.config');

module.exports = function(grunt) {
  const brands = ['very', 'veryexclusive', 'littlewoods', 'littlewoodsireland'];
  const devices = ['desktop', 'mobile'];

  /* The sass task compiles all _components/styles.scss files into css files, 
   * and the same for  the _design/styles.scss files.
   * These then both get concatenated down to the main.css, with correct sourcemapping
   */
  const sassConfig = {}
  for (let brand of brands) {
    const files = [];
    for (let device of devices) {
      files.push({
        expand: true,
        cwd: '',
        src: [`_components/**/scss/*${brand}-${device}.scss`, `_design/**/scss/*${brand}-${device}.scss`],
        dest: `dist/css`,
        ext: '.css'
      });
    }

    sassConfig[brand] = {
      options: {
        sourcemap: 'none'
      },
      files: files
    }
  }

  const concatConfig = {}
  for (let brand of brands) {
    for (let device of devices) {
      concatConfig[`${brand}-${device}`] = {
      options: {
          sourceMap: true,
        },
        src: [`dist/css/**/*${brand}-${device}.css`],
        dest: `dist/css/${device}-${brand}.css`,
      }
    }
    
  }

  const config = {

    concat: Object.assign(concatConfig, {
      demo: {
        options: {
          sourceMap: true
        },
        src: ['assets/dist/css/**/*.css', '!assets/dist/css/main.css'],
        dest: 'assets/dist/css/main.css'
      },
    }),

    sass: Object.assign(sassConfig, {
      /* These tasks compile all _components/demo-assets/*.scss files into css files, 
       * and the same for  the _design/demo-assets/*.scss files, as well as the main
       * demo site styles .scss file.
       * These all then get concatenated down to the main demo site .css file, with correct sourcemapping
       */
      demos: {
        options: {
          sourcemap: 'none'
        },
        files: [
          {
            expand: true,
            cwd: '',
            src: ['_components/**/demo-assets/*.scss', '_design/**/demo-assets/*.scss'],
            dest: 'assets/dist/css/demos',
            ext: '.css'
          }
        ]
      },
      "demo-site": {
        options: {
          sourcemap: 'none'
        },
        files: {
          'assets/dist/css/base.css': 'assets/src/scss/base.scss'
        }
      }
    }),

    postcss: {
      /* The postcss script performs functions on the generated css files, at the moment it:
       * - automatically adds vender prefixes for the 'last 4 version' (i.e. automatically including -webkit-transition)
       * - minifies the css
       */
      options: {
        map: true, 
        processors: [
          require('autoprefixer')({browsers: 'last 4 versions'}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'dist/css/**/*.css'
      },
      demo: {
        src: 'assets/dist/css/**/*.css'
      }
    },

    webpack: {
      demo: webpackConfig
    },

    uglify: {
      /* The uglify script takes in all files in each components/designs /js sub-folder.
       * This allows us to include multiple scripts per component, for an example if we 
       * needed to include slick-slider.js for a carousel
       */
      options: {
        sourceMap: true
      },
      dist: {
        src:  ['_components/**/js/*.js', '_design/**/js/*.js'],
        dest: 'dist/js/main.js'
      },
      demos: {
        src: ['_components/**/demo-assets/*.js', '_design/**/demo-assets/*.js'],
        dest: 'assets/dist/js/demos.js'
      }
    },

    jekyll: {
      dev: {
          options: {
              config: '_config.yml',
              raw: 'baseurl: ""'
          }
      },
      dist: {
        options: {
            config: '_config.yml'
        }
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
				files: ['assets/src/scss/**/*', '_components/**/demo-assets/demo.scss', '_design/**/demo-assets/demo.scss',
                  '_design/**/scss/styles.scss', '_components/**/scss/styles.scss'],
				tasks: ['sass', 'concat', 'postcss', 'jekyll:dev']
			},
			js: {
				files: ['<%= uglify.dist.src %>', '_components/**/demo-assets/demo.js', '_design/**/demo-assets/demo.js', 'assets/src/js/**/*' ],
				tasks: ['webpack', 'uglify', 'jekyll:dev']
			},
      demo: {
        files: ['_components/**/demo.md', '_design/**/demo.md', '_layouts/**/*', '_includes/**/*', '_plugins/**/*', '_assets/css/*'],
        tasks: ['jekyll:dev']
      }
		},
  }

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['sass', 'concat', 'postcss', 'webpack', 'uglify', 'jekyll:dist']);
  grunt.registerTask('serve', ['sass', 'concat' ,'postcss', 'webpack', 'uglify', 'jekyll:dev', 'connect', 'watch']); 
};
