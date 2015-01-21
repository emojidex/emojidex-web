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
        ' *  =LICENSE=\n' +
        ' *  <%= pkg.licenses.description %>\n' +
        ' *  <%= pkg.licenses.url %>\n' +
        ' *\n' +
        ' *  <%= pkg.licenses.copyright %>\n' +
        ' */\n'

    # CoffeeScript compilation
    coffee:
      emojidex:
        options:
          join: true
        files:
          'src/compiled_js/emojidex_pack.js': ['src/coffee/**/*.coffee']

    # Concat definitions
    concat:
      src_js:
        options:
          stripBanners: true
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
        options:
          manglet: true
        src: ['dist/js/emojidex.js']
        dest: 'dist/js/emojidex.min.js'
      bootstrap:
        src: ['node_modules/bootstrap-sass/assets/javascripts/bootstrap.js']
        dest: 'dist/js/bootstrap.min.js'

      options:
        preserveComments: 'all'

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
          {
            expand: true,
            cwd: 'bower_components/jquery.storageapi/'
            src: 'jquery.storageapi.min.js'
            dest: 'dist/js/'
          }
        ]

    # watch definitions
    watch:
      html:
        files:['src/slim/*.slim']
        tasks:['slim']
      coffee:
        files: ['src/coffee/**/*.coffee']
        tasks: ['coffee', 'concat:src_js', 'uglify']
      sass:
        files: ['src/sass/*.scss']
        tasks: ['sass']

      options:
        livereload: true

    # jasmine definitions
    jasmine:
      src: [
        'dist/**/*.js'
      ]
      options:
        keepRunner: true
        outfile: 'build/_SpecRunner.html'
        specs: 'build/spec/*.js'
        vendor:[
          'https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js'
          'node_modules/jasmine-jquery/lib/jasmine-jquery.js'
        ]

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
  grunt.loadNpmTasks 'grunt-contrib-jasmine'
  # grunt.loadNpmTasks 'grunt-contrib-jshint'

  grunt.registerTask 'default', ['coffee', 'concat:src_js', 'uglify', 'sass', 'slim', 'copy']
  grunt.registerTask 'dev', ['connect', 'watch']
  # grunt.registerTask 'travis', ['jshint']
