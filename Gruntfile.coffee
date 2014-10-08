module.exports = (grunt) ->
  grunt.initConfig

    # Import package manifest
    pkg: grunt.file.readJSON('emojidex.jquery.json')

    # Banner definitions
    meta:
      banner:
        '/*\n' +
        ' *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
        ' *  <%= pkg.description %>\n' +
        ' *  <%= pkg.homepage %>\n' +
        ' *\n' +
        ' *  Made by <%= pkg.author.name %>\n' +
        ' *  Under <%= pkg.licenses[0].type %> License\n' +
        ' */\n'

    # CoffeeScript compilation
    coffee:
      glob_to_multiple:
        expand: true
        cwd: 'src/coffees/'
        src: ['core.coffee']
        dest: 'src/compiled_js'
        rename: (dest, src) ->
          return dest + '/' + src.replace(/\.coffee$/, '.js')

      catalog:
        expand: true
        cwd: 'src/coffees/catalog'
        src: ['catalog.coffee']
        dest: 'dist'
        rename: (dest, src) ->
          return dest + '/' + src.replace(/\.coffee$/, '.js')


    # Concat definitions
    concat:
      src_coffee:
        src:[
          'src/coffees/core/emojidex.coffee'
          'src/coffees/core/**/*.coffee'
        ]
        dest: 'src/coffees/core.coffee'

      src_js:
        options:
          banner: '<%= meta.banner %>'
        src: [
          'src/compiled_js/**/*.js'
          'src/assets/libs/At.js/dist/js/jquery.atwho.js'
          'src/assets/libs/Caret.js/dist/jquery.caret.min.js'
        ]
        dest: 'dist/emojidex.js'

    # Minify definitions
    uglify:
      my_target:
        src: ['dist/emojidex.js']
        dest: 'dist/emojidex.min.js'

      options:
        banner: '<%= meta.banner %>'

    # connect definitions
    connect:
      site: {}

    # Watch definitions
    watch:
      files: ['src/coffees/**/*.coffee']
      tasks: ['concat:src_coffee', 'coffee', 'concat:src_js', 'uglify']
      options: 
        livereload: true

    # Lint definitions
    # jshint:
    #   files: ['src/jquery.emojidex.js']
    #   options:
    #     jshintrc: '.jshintrc'

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.registerTask 'default', ['concat:src_coffee', 'coffee', 'concat:src_js', 'uglify']
  # grunt.loadNpmTasks 'grunt-contrib-jshint'
  # grunt.registerTask 'travis', ['jshint']