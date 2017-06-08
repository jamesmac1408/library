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
    uglify: {
      options: {
        
      },
      dist: {
        files: {
          'dist/main.js': ['components/**/js/component.js']
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['sass', 'uglify']);

};
