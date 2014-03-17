module.exports = (grunt) ->
  grunt.initConfig
    
    # Import package manifest
    pkg: grunt.file.readJSON("emojidex.jquery.json")
    
    # Banner definitions
    meta:
      banner:
        "/*\n" +
        " *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
        " *  <%= pkg.description %>\n" +
        " *  <%= pkg.homepage %>\n" +
        " *\n" +
        " *  Made by <%= pkg.author.name %>\n" +
        " *  Under <%= pkg.licenses[0].type %> License\n" +
        " */\n"
    
    # CoffeeScript compilation
    coffee:
      glob_to_multiple:
        expand: true
        cwd: 'src/coffees/'
        src: ['**/*.coffee']
        dest: 'dist/'
        rename: (dest, src) ->
          return dest + '/' + src.replace(/\.coffee$/, '.js')

    # Concat definitions
    concat:
      dist:
        src: ["dist/emojidex.js"]
        dest: "dist/emojidex.js"

      options:
        banner: "<%= meta.banner %>"
    
    # Minify definitions
    uglify:
      my_target:
        src: ["dist/emojidex.js"]
        dest: "dist/emojidex.min.js"

      options:
        banner: "<%= meta.banner %>"
    
    # Watch definitions
    watch:
      files: ["src/coffees/**/*.coffee"]
      tasks: ["coffee", "concat", "uglify"]

    # Lint definitions
    # jshint:
    #   files: ["src/jquery.emojidex.js"]
    #   options:
    #     jshintrc: ".jshintrc"

  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-watch"
  # grunt.loadNpmTasks "grunt-contrib-jshint"
  grunt.registerTask "default", ["coffee", "concat", "uglify"]
  grunt.registerTask "travis", ["jshint"]