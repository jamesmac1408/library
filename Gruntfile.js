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
    }
  });


  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-execute');

  grunt.registerTask('default', ['sass', 'postcss', 'uglify', 'execute']);

};
