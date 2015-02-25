module.exports = (grunt) ->
  path = require('path')

  grunt.getLicense = (licenses_json) ->
    licenses = grunt.file.readJSON licenses_json
    info = ''
    for license in licenses
      license = '\n' + license unless license.slice(0, 1) is '\n'
      info += license.replace /[ \n\*]+(.+) +\n/gi , "\n * $1"
      info += '* --------------------------------'
    return info

  getDefineUsePattern = (filepath, define_list) ->
    for define_name in Object.keys define_list
      path_patterns = define_list[define_name].pattern
      path_patterns = [path_patterns] unless Array.isArray path_patterns
      for path_pattern in path_patterns
        if grunt.file.minimatch filepath, path_pattern
          return define_list[define_name]
          break

  setGruntConfig_getTask = (define) ->
    if define.config?
      define.config = [define.config] unless Array.isArray define.config
      for config in define.config
        grunt.config config.prop, config.value
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
        ' *   emojidexReplace, emojidexAutocomplete\n' +
        ' *\n' +
        ' * =LICENSE=\n' +
        ' * <%= pkg.licenses.description %>\n' +
        ' * <%= pkg.licenses.url %>\n' +
        ' *\n' +
        ' * <%= pkg.licenses.copyright %>\n' +
        ' *\n' +
        ' *\n' +
        ' * Includes:\n' +
        ' * --------------------------------'

    # grunt dev --------------------------------
    connect:
      site: {}

    esteWatch:
      options:
        dirs: [
          'src/slim/**/'
          'src/sass/**/'
          'src/coffee/**/'
          'spec/**/'
        ]
        livereload:
          enabled: true
          port: 35729,
          extensions: ['slim', 'coffee', 'scss']

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

        define_list =
          emojidex:
            pattern: "src/coffee/#{path.dirname(filepath).split('/')[2]}/**/*"
            config:
              prop: defaults.jasmine.prop
              value:
                src: defaults.jasmine.value.src
                options:
                  specs: [
                    "build/spec/#{path.dirname(filepath).split('/')[2]}.js"
                  ]
            task: [
              "coffee:#{path.dirname(filepath).split('/')[2]}"
              'concat'
              'uglify:emojidex'
              defaults.jasmine.prop.join(':')
            ]

          spec:
            pattern: 'spec/**/*'
            config: [
              {
                prop: defaults.coffee.prop
                value:
                  expand: true
                  src: filepath
                  dest: 'build/'
                  ext: '.js'
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
            task: [defaults.coffee.prop.join(':'), defaults.jasmine.prop.join(':')]

        setGruntConfig_getTask(getDefineUsePattern filepath, define_list)

      'slim': (filepath) ->
        define_slim =
          config:
            prop: ['slim', 'esteWatch']
            value:
              files: [
                expand: true
                flatten: true
                src: filepath
                dest: 'dist/'
                ext: '.html'
              ]
          task: ['slim:esteWatch']

        setGruntConfig_getTask define_slim

      'scss': (filepath) ->
        define_sass =
          config:
            prop: ['sass', 'esteWatch']
            value:
              files: [
                expand: true
                flatten: true
                src: filepath
                dest: 'dist/css/'
                ext: '.css'
              ]
          task: ['sass:esteWatch']

        setGruntConfig_getTask define_sass

    # grunt --------------------------------
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

    coffee:
      emojidexReplace:
        options:
          join: true
        files:
          'src/compiled_js/emojidexReplace.js': [
            'src/coffee/emojidexReplace/main.coffee'
            'src/coffee/emojidexReplace/components/*.coffee'
          ]

      emojidexAutocomplete:
        options:
          join: true
        files:
          'src/compiled_js/emojidexAutocomplete.js': [
            'src/coffee/emojidexAutocomplete/main.coffee'
            'src/coffee/emojidexAutocomplete/components/*.coffee'
          ]

      emojidexPallet:
        options:
          join: true
        files:
          'src/compiled_js/emojidexPallet.js': [
            'src/coffee/emojidexPallet/main.coffee'
            'src/coffee/emojidexPallet/components/*.coffee'
          ]

      spec:
        expand: true
        flatten: true
        cwd: 'spec/'
        src: ['*.coffee']
        dest: 'build/spec/'
        ext: '.js'

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
            cwd: 'bower_components/At.js/dist/css'
            src: 'jquery.atwho.min.css'
            dest: 'dist/css/'
          }
        ]

    concat:
      emojidex:
        options:
          stripBanners: true
          banner: '<%= meta.banner %><%= grunt.getLicense("build/licenses.json") %>\n */\n'
        src: [
          # 'bower_components/bootstrap-window/dist/js/bootstrap-window.min.js'
          'bower_components/Caret.js/dist/jquery.caret.js'
          'bower_components/At.js/dist/js/jquery.atwho.js'
          'node_modules/emojidex-client/dist/js/emojidex-client.js'
          'src/compiled_js/**/*.js'
        ]
        dest: 'dist/js/emojidex.js'

    uglify:
      emojidex:
        options:
          banner: '<%= meta.banner %><%= grunt.getLicense("build/licenses.json") %>\n */\n'
          manglet: true
        src: ['dist/js/emojidex.js']
        dest: 'dist/js/emojidex.min.js'

      bootstrap:
        src: ['node_modules/bootstrap-sass/assets/javascripts/bootstrap.js']
        dest: 'dist/js/bootstrap.min.js'

    save_license:
      dist:
        src: [
          'node_modules/emojidex-client/dist/js/emojidex-client.js'
          'bower_components/Caret.js/dist/jquery.caret.js'
          'bower_components/At.js/dist/js/jquery.atwho.js'
        ]
        dest: 'build/licenses.json'

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-slim'
  grunt.loadNpmTasks 'grunt-este-watch'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'
  grunt.loadNpmTasks 'grunt-license-saver'

  grunt.registerTask 'default', ['save_license', 'coffee', 'concat', 'uglify', 'sass', 'slim', 'copy', 'jasmine']
  grunt.registerTask 'dev', ['connect', 'esteWatch']
