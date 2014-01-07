module.exports = function(grunt) {
 
  grunt.registerTask('watch', [ 'watch' ]);
 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      style: {
        files: {
          "source/stylesheets/hashicorp.css": "source/stylesheets/less/hashicorp.css.less"
        }
      }
    },
    watch: {
      css: {
        files: ['source/stylesheets/less/*.less'],
        tasks: ['less:style'],
        options: {
          livereload: true,
        }
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
 
};
