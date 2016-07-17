module.exports = (grunt) ->
  path = require 'path'

  dotenv = require 'dotenv'
  dotenv.config()

  data_path = process.env.DATA_PATH
  unless data_path?
    data_path = ''

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
        ' * <%= pkg.license.description %>\n' +
        ' * <%= pkg.license.url %>\n' +
        ' *\n' +
        ' * <%= pkg.license.copyright %>\n' +
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
          extensions: ['slim', 'coffee', 'scss', 'sass']

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
              'concat:emojidex_js'
              'uglify:emojidex'
              defaults.jasmine.prop.join(':') + ':build'
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
            task: [
              defaults.coffee.prop.join(':')
              defaults.jasmine.prop.join(':') + ':build'
            ]

        setGruntConfig_getTask(getDefineUsePattern filepath, define_list)

      'slim': (filepath) ->
        define_list =
          dist:
            pattern: 'src/slim/**/*'
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
            task: ['slim:esteWatch', 'md2html']

          spec:
            pattern: 'spec/fixture/**/*'
            config:
              prop: ['slim', 'esteWatch']
              value:
                files: [
                  expand: true
                  flatten: true
                  src: filepath
                  dest: 'build/spec/fixture/'
                  ext: '.html'
                ]
            task: ['slim:esteWatch']

        setGruntConfig_getTask(getDefineUsePattern filepath, define_list)

      'scss': (filepath) ->
        define_sass =
          config:
            prop: ['sass', 'esteWatch']
            value:
              files: [
                expand: true
                cwd: 'src/sass/'
                src: ['*.sass', '*.scss']
                dest: 'src/compiled_css/'
                ext: '.css'
              ]
          task: ['sass:esteWatch', 'concat:emojidex_css', 'cssmin:emojidex']
        setGruntConfig_getTask define_sass

      'sass': (filepath) ->
        define_sass =
          config:
            prop: ['sass', 'esteWatch']
            value:
              files: [
                expand: true
                cwd: 'src/sass/'
                src: ['*.sass', '*.scss']
                dest: 'src/compiled_css/'
                ext: '.css'
              ]
          task: ['sass:esteWatch', 'concat:emojidex_css', 'cssmin:emojidex']
        setGruntConfig_getTask define_sass

    # grunt --------------------------------
    md2html:
      readme:
        files: [
          {
            src: 'README.md'
            dest: 'dist/index.html'
          }
        ]
        options:
          layout: 'dist/index.html'
          highlightjs:
            enabled: true
            compressStyle: true
            options: {}

    clean:
      spec: ['build/spec/*.js']

    jasmine:
      coverage:
        src: [
          'dist/js/emojidex.js'
        ]
        options:
          specs: 'build/spec/**/*.js'
          template: require('grunt-template-jasmine-istanbul')
          templateOptions:
            coverage: 'build/spec/coverage/coverage.json'
            report: [
              {
                type: 'html'
                options: dir: 'build/spec/coverage/html'
              }
              {
                type: 'cobertura'
                options: dir: 'build/spec/coverage/cobertura'
              }
              { type: 'text-summary' }
            ]
      options:
        keepRunner: true
        outfile: 'build/_SpecRunner.html'
        vendor:[
          'node_modules/jquery/dist/jquery.min.js'
          'node_modules/jquery-watch/jquery-watch.min.js'
          'node_modules/promise-polyfill/promise.min.js'
        ]
        helpers:[
          'build/spec/helpers/method.js'
          'build/spec/helpers/data.js'
          data_path
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
            'src/coffee/emojidexPallet/components/tabs/*.coffee'
          ]

      spec:
        expand: true
        cwd: 'spec/'
        src: ['**/*.coffee']
        dest: 'build/spec/'
        ext: '.js'

    sass:
      dist:
        files: [
          expand: true
          cwd: 'src/sass/'
          src: ['*.sass', '*.scss']
          dest: 'src/compiled_css/'
          ext: '.css'
        ]

    slim:
      options:
        pretty: true
      dist:
        files: [
          expand: true
          cwd: 'src/slim/'
          src: '*.slim'
          dest: 'dist/'
          ext: '.html'
        ]
      spec:
        files: [
          expand: true
          cwd: 'spec/fixture/'
          src: '*.slim'
          dest: 'build/spec/fixture/'
          ext: '.html'
        ]

    copy:
      img:
        expand: true
        cwd: 'src/img/'
        src: '**/*'
        dest: 'dist/img/'
      bootstrap_icons:
        expand: true
        cwd: 'node_modules/bootstrap-sass/assets/fonts/'
        src: '**/*'
        dest: 'dist/fonts/'

    concat:
      emojidex_js:
        options:
          stripBanners: true
          banner: '<%= meta.banner %><%= grunt.getLicense("build/licenses.json") %>\n */\n'
        src: [
          'bower_components/Caret.js/dist/jquery.caret.min.js'
          'bower_components/At.js/dist/js/jquery.atwho.min.js'
          'node_modules/emojidex-client/dist/js/*.min.js'
          'node_modules/clipboard/dist/clipboard.min.js'
          'node_modules/bootstrap-sass/assets/javascripts/bootstrap/tab.js'
          'src/compiled_js/**/*.js'
          'src/vendor/jquery-ui-1.11.4.custom/jquery-ui.min.js'
        ]
        dest: 'dist/js/emojidex.js'

      emojidex_css:
        src: [
          'bower_components/At.js/dist/css/jquery.atwho.min.css'
          'src/compiled_css/emojidex.css'
        ]
        dest: 'dist/css/emojidex.css'

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

    cssmin:
      emojidex:
        src : ['dist/css/emojidex.css']
        dest : 'dist/css/emojidex.min.css'

      bootstrap:
        src : ['src/compiled_css/document.css']
        dest : 'dist/css/document.min.css'

    save_license:
      dist:
        src: [
          'node_modules/emojidex-client/dist/js/emojidex-client.js'
          'node_modules/clipboard/dist/clipboard.js'
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
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-md2html'
  grunt.loadNpmTasks 'grunt-contrib-clean'


  grunt.registerTask 'default', ['clean', 'save_license', 'coffee', 'sass', 'concat', 'uglify', 'cssmin', 'slim', 'copy', 'jasmine:coverage:build', 'md2html']
  grunt.registerTask 'dev', ['connect', 'esteWatch']
