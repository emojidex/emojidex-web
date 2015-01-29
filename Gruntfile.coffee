module.exports = (grunt) ->
  path = require('path')

  getDefineUsePattern = (filepath, define_list) ->
    for define_name in Object.keys define_list
      path_patterns = define_list[define_name].pattern
      path_patterns = [path_patterns] unless Array.isArray path_patterns
      for path_pattern in path_patterns
        if grunt.file.minimatch filepath, path_pattern
          return define_list[define_name]
          break

  setGruntConfigAndGetTask = (define) ->
    define.config = [define.config] unless Array.isArray define.config
    for config in define.config
      grunt.config(
        config.prop, config.value
      )
    return define.task

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    meta:
      banner:
        '/*\n' +
        ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
        ' * <%= pkg.description %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' *\n' +
        ' * Includes:\n' +
        ' *   emojidex-client, emojidexReplace, emojidexAutocomplete\n' +
        ' *\n' +
        ' * =LICENSE=\n' +
        ' * <%= pkg.licenses.description %>\n' +
        ' * <%= pkg.licenses.url %>\n' +
        ' *\n' +
        ' * <%= pkg.licenses.copyright %>\n' +
        ' */\n'

    concat:
      emojidex:
        options:
          stripBanners: true
          banner: '<%= meta.banner %>'
        src: [
          # 'bower_components/Caret.js/dist/jquery.caret.min.js'
          # 'bower_components/At.js/dist/js/jquery.atwho.min.js'
          'bower_components/bootstrap-window/dist/js/bootstrap-window.min.js'
          'node_modules/emojidex-client/dist/js/*.min.js'
          'src/compiled_js/**/*.js'
        ]
        dest: 'dist/js/emojidex.js'

    uglify:
      emojidex:
        options:
          banner: '<%= meta.banner %>'
          manglet: true
        src: ['dist/js/emojidex.js']
        dest: 'dist/js/emojidex.min.js'

      bootstrap:
        src: ['node_modules/bootstrap-sass/assets/javascripts/bootstrap.js']
        dest: 'dist/js/bootstrap.min.js'

    connect:
      site: {}

    sass:
     dist:
       files: [
        expand: true
        cwd: 'src/sass/'
        src: '*.scss'
        dest: 'dist/css/'
        ext: '.css'
       ]

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

    copy:
      img:
        expand: true,
        cwd: 'src/img/'
        src: '**/*'
        dest: 'dist/img/'

      lib:
        files: [
          {
            expand: true,
            cwd: 'bower_components/Caret.js/dist/'
            src: 'jquery.caret.min.js'
            dest: 'dist/js/'
          }
          {
            expand: true,
            cwd: 'bower_components/At.js/dist/css'
            src: 'jquery.atwho.min.css'
            dest: 'dist/css/'
          }
          {
            expand: true,
            cwd: 'bower_components/At.js/dist/js'
            src: 'jquery.atwho.min.js'
            dest: 'dist/js/'
          }
        ]

    jasmine:
      all:
        src: [
          'dist/js/*.min.js'
        ]
        options:
          specs: [
            'build/spec/**/*.js'
          ]

      options:
        keepRunner: true
        outfile: 'build/_SpecRunner.html'
        vendor:[
          'https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js'
        ]
        helpers:[
          'node_modules/jasmine-jquery/lib/jasmine-jquery.js'
        ]


    esteWatch:
      options:
        dirs: [
          'src/coffee/**/'
          'spec/**/'
        ]

      'coffee': (filepath) ->
        defaults =
          coffee:
            prop: ['coffee', 'esteWatch']
            options:
              join: true

          jasmine:
            prop: ['jasmine', 'esteWatch']
            value:
              src: ['dist/js/*.min.js']

          task: ['coffee:esteWatch']


        define_list =
          emojidexReplace:
            pattern: 'src/coffee/emojidex_replace/**/*'
            config:
              prop: defaults.coffee.prop
              value:
                options: defaults.coffee.options
                files:
                  'src/compiled_js/emojidexReplace.js': [
                    'src/coffee/emojidex_replace/**/*.coffee'
                  ]

          emojidexAutocomplete:
            pattern: 'src/coffee/emojidex_autocomplete/**/*'
            config:
              prop: defaults.coffee.prop
              value:
                options: defaults.coffee.options
                files:
                  'src/compiled_js/emojidexAutocomplete.js': [
                    'src/coffee/emojidex_autocomplete/**/*.coffee'
                  ]

          emojidexPallet:
            pattern: 'src/coffee/emojidex_pallet/**/*'
            config:
              prop: defaults.coffee.prop
              value:
                options: defaults.coffee.options
                files:
                  'src/compiled_js/emojidexPallet.js': [
                    'src/coffee/emojidex_pallet/**/*.coffee'
                  ]

          spec:
            pattern: 'spec/**/*'
            config: [
              {
                prop: defaults.coffee.prop
                value:
                  expand: true
                  src: filepath
                  dest: "build#{path.dirname filepath}/#{path.basename filepath, '.coffee'}.js"
              }
              {
                prop: defaults.jasmine.prop
                value:
                  src: defaults.jasmine.value.src
                  options:
                    specs: [
                      "build/#{path.dirname filepath}/#{path.basename filepath, '.coffee'}.js"
                    ]
              }
            ]

            task: ['coffee:esteWatch', 'jasmine:esteWatch']

        grunt.log.ok "build/#{path.dirname filepath}/#{path.basename filepath, '.coffee'}.js"
        setGruntConfigAndGetTask(getDefineUsePattern filepath, define_list) || defaults.task


  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-slim'
  # grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-este-watch'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'

  grunt.registerTask 'default', ['coffee', 'concat', 'uglify', 'sass', 'slim', 'copy', 'jasmine:all']
  grunt.registerTask 'dev', ['connect', 'esteWatch']
