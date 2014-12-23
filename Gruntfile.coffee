module.exports = (grunt) ->
  grunt.initConfig

    # Import package manifest
    pkg: grunt.file.readJSON('package.json')

    # Banner definitions
    meta:
      banner:
        '/*\n' +
        ' *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
        ' *  <%= pkg.description %>\n' +
        ' *  <%= pkg.homepage %>\n' +
        ' *\n' +
        ' *  Made by <%= pkg.author %>\n' +
        ' *  Under <%= pkg.licenses[0].type %> License\n' +
        ' *  <%= pkg.licenses[0].url %> License\n' +
        ' */\n'

    # CoffeeScript compilation
    coffee:
      glob_to_multiple:
        expand: true
        cwd: 'src/coffee/'
        src: ['concatenated_core.coffee']
        dest: 'src/compiled_js'
        rename: (dest, src) ->
          return dest + '/' + src.replace(/\.coffee$/, '.js')

    # Concat definitions
    concat:
      src_coffee:
        src:[
          'src/coffee/core/emojidex.coffee'
          'src/coffee/core/**/*.coffee'
        ]
        dest: 'src/coffee/concatenated_core.coffee'

      src_js:
        options:
          banner: '<%= meta.banner %>'
        src: [
          # 'bower_components/Caret.js/dist/jquery.caret.min.js'
          # 'bower_components/At.js/dist/js/jquery.atwho.min.js'
          'src/compiled_js/**/*.js'
        ]
        dest: 'dist/js/emojidex.js'

    # Minify definitions
    uglify:
      emojidex:
        src: ['dist/js/emojidex.js']
        dest: 'dist/js/emojidex.min.js'
      bootstrap:
        src: ['node_modules/bootstrap-sass/assets/javascripts/bootstrap.js']
        dest: 'dist/js/bootstrap.min.js'

      options:
        banner: '<%= meta.banner %>'

    # connect definitions
    connect:
      site: {}

    # sass definitions
    sass:
     dist:
       files: [
        expand: true
        cwd: 'src/sass/'
        src: '*.scss'
        dest: 'dist/css/'
        ext: '.css'
       ]

    # slim definitions
    slim:
      options:
        pretty: true
      dsit:
        files: [
          expand: true
          cwd: 'src/slim/'
          src: '*.slim'
          dest: 'dist/'
          ext: '.html'
        ]

    # copy definitions
    copy:
      img:
        expand: true,
        cwd: 'src/img/'
        src: '**/*'
        dest: 'dist/img/'
      atwho:
        files: [
          {
            expand: true,
            cwd: 'bower_components/Caret.js/dist/'
            src: 'jquery.caret.min.js'
            dest: 'dist/js/'
          }
          {
            expand: true,
            cwd: 'bower_components/jquery.atwho/dist/css'
            src: 'jquery.atwho.min.css'
            dest: 'dist/css/'
          }
          {
            expand: true,
            cwd: 'bower_components/jquery.atwho/dist/js'
            src: 'jquery.atwho.min.js'
            dest: 'dist/js/'
          }
        ]

    # Watch definitions
    watch:
      html:
        files:['src/slim/*.slim']
        tasks:['slim']
      coffee:
        files: ['src/coffee/**/*.coffee']
        tasks: ['concat:src_coffee', 'coffee', 'concat:src_js', 'uglify']
      sass:
        files: ['src/sass/*.scss']
        tasks: ['sass']

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
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-slim'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  # grunt.loadNpmTasks 'grunt-contrib-jshint'

  grunt.registerTask 'default', ['concat:src_coffee', 'coffee', 'concat:src_js', 'uglify', 'sass', 'slim', 'copy']
  grunt.registerTask 'dev', ['connect', 'watch']
  # grunt.registerTask 'travis', ['jshint']
