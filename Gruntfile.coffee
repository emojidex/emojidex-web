module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    meta:
      banner:
        '/*\n' +
        ' *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
        ' *  <%= pkg.description %>\n' +
        ' *  <%= pkg.homepage %>\n' +
        ' *\n' +
        ' *  =LICENSE=\n' +
        ' *  <%= pkg.licenses.description %>\n' +
        ' *  <%= pkg.licenses.url %>\n' +
        ' *\n' +
        ' *  <%= pkg.licenses.copyright %>\n' +
        ' */\n'

    coffee:
      emojidexReplace:
        options:
          join: true
        files:
          'src/compiled_js/emojidexReplace.js': [
            'src/coffee/components/replacer.coffee'
            'src/coffee/components/replacer_service.coffee'
            'src/coffee/emojidex_replace.coffee'
          ]

      emojidexAutocomplete:
        options:
          join: true
        files:
          'src/compiled_js/emojidexAutocomplete.js': [
            'src/coffee/components/autocomplete.coffee'
            'src/coffee/emojidex_autocomplete.coffee'
          ]

      spec:
        expand: true
        flatten: true
        cwd: 'spec/'
        src: ['*.coffee']
        dest: 'build/spec/'
        ext: '.js'

    concat:
      emojidexAutocomplete:
        # options:
        #   stripBanners: false
        #   banner: '<%= meta.banner %>'
        src: [
          'node_modules/emojidex-client/dist/js/*.min.js'
          'src/compiled_js/emojidexAutocomplete.js'
        ]
        dest: 'src/compiled_js/emojidexAutocomplete.js'

      emojidex:
        options:
          stripBanners: false
          banner: '<%= meta.banner %>'
        src: [
          # 'bower_components/Caret.js/dist/jquery.caret.min.js'
          # 'bower_components/At.js/dist/js/jquery.atwho.min.js'
          'src/compiled_js/**/*.js'
        ]
        dest: 'dist/js/emojidex.js'

    uglify:
      options:
        preserveComments: 'all'

      emojidex:
        options:
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

    watch:
      options:
        livereload: true

      html:
        files:['src/slim/*.slim']
        tasks:['slim']

      coffee:
        files: ['src/coffee/**/*.coffee']
        tasks: ['coffee:emojidex', 'concat', 'uglify:emojidex', 'jasmine']

      sass:
        files: ['src/sass/*.scss']
        tasks: ['sass']

      spec:
        files: ['spec/**/*.coffee']
        tasks: ['coffee:spec', 'jasmine']

    jasmine:
      all:
        src: [
          'dist/js/*.min.js'
        ]
        options:
          keepRunner: true
          outfile: 'build/_SpecRunner.html'
          specs: [
            'build/spec/*.js'
          ]
          vendor:[
            'https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js'
          ]
          helpers:[
            'node_modules/jasmine-jquery/lib/jasmine-jquery.js'
          ]

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-slim'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'

  grunt.registerTask 'default', ['coffee', 'concat', 'uglify', 'sass', 'slim', 'copy', 'jasmine']
  grunt.registerTask 'dev', ['connect', 'watch']
