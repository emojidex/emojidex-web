module.exports = (grunt) ->
  grunt.loadNpmTasks('grunt-contrib-coffee')

  grunt.initConfig
    watch:
      coffee:
        files: "src/**/*.coffee",
        tasks: ["coffee"]
	
    coffee:
      compile:
        files:
          'emojidex/emojidex.js': [
            "src/**/*.coffee"
          ]

  grunt.registerTask "run", ["coffee", "watch:coffee"]
