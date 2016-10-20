module.exports = function(grunt) {
  let path = require('path');

  // Check for .env file to generate auth info for advanced specs
  if (grunt.file.exists('.env')) {
    grunt.log.writeln("*Found .env file; incorporating user auth data into specs.*");
    grunt.log.writeln("NOTE: if your user is not Premium with R-18 enabled some specs will fail.");
    let dotenv = require('dotenv');
    dotenv.config();

    output = `
      this.user_info = {
        auth_user: '${process.env.USERNAME}',
        email: '${process.env.EMAIL}',
        password: '${process.env.PASSWORD}',
        auth_token: '${process.env.AUTH_TOKEN}'
      };

      this.premium_user_info = {
        auth_user: '${process.env.USERNAME}',
        auth_token: '${process.env.AUTH_TOKEN}'
      };
    `;

    grunt.file.write('tmp/authinfo.js', output);
  } else { // .env file wasn't found
    grunt.log.writeln("*.env file not found; only some specs will run.*");
    grunt.log.writeln("Check the '.env' secion in README.md for details on how to set .env");
    grunt.file.write('tmp/authinfo.js', "");
  }

  // Grunt task configurations
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
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
    },

    //=========================================================================
    // Grunt configurations for individual tasks
    //=========================================================================

    // Clean out old files / temporary files / build partials
    clean: {
      spec: ['build/spec/*.js'],
      compiled: [
        'src/compiled_js/**/*.js',
        'src/compiled_js/**/*.map',
        'src/compiled_css/**/*.css',
        'src/compiled_css/**/*.map',
        'build/js/**/*.js',
        'build/js/**/*.map',
        'dist',
        'docs'
      ]
    },

    // Pre-render the README.md file into part of the demo index
    md2html: {
      readme: {
        files: [
          {
            src: 'README.md',
            dest: 'dist/index.html'
          }
        ],
        options: {
          layout: 'dist/index.html',
          highlightjs: {
            enabled: true,
            compressStyle: true,
            options: {}
          }
        }
      }
    },

    // Compile SASS files into CSS
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/sass/',
          src: ['*.sass', '*.scss'],
          dest: 'src/compiled_css/',
          ext: '.css'
        }]
      }
    },

    // Compile SLIM files into HTML
    slim: {
      options: {
        pretty: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/slim/',
          src: '*.slim',
          dest: 'dist/',
          ext: '.html'
        }]
      },
      spec: {
        files: [{
          expand: true,
          cwd: 'spec/fixture/',
          src: '*.slim',
          dest: 'build/spec/fixture/',
          ext: '.html'
        }]
      }
    },

    // Babel configuration to convert es6 to es5~ish JS
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/es6',
          src: ['**/*.js'],
          dest: 'build/js/',
          ext: '.js'
        }]
      }
    },

    // Smash it all into a smaller file
    uglify: {
      emojidex: {
        options: {
          banner: '<%= meta.banner %>\n */\n',
          manglet: true
        },
        src: ['dist/js/emojidex.js'],
        dest: 'dist/js/emojidex.min.js'
      },
      bootstrap: {
        src: ['node_modules/bootstrap-sass/assets/javascripts/bootstrap.js'],
        dest: 'dist/resources/bootstrap.min.js'
      }
    },
    cssmin: {
      emojidex: {
        src : ['dist/css/emojidex.css'],
        dest : 'dist/css/emojidex.min.css'
      },
      bootstrap: {
        src : ['src/compiled_css/document.css'],
        dest : 'dist/css/document.min.css'
      }
    },
    copy: {
      img: {
        expand: true,
        cwd: 'src/img/',
        src: '**/*',
        dest: 'dist/img/'
      },
      bootstrap_icons: {
        expand: true,
        cwd: 'node_modules/bootstrap-sass/assets/fonts/',
        src: '**/*',
        dest: 'dist/fonts/'
      },
      jquery: {
        expand: true,
        cwd: 'node_modules/jquery/dist/',
        src: 'jquery.min.js',
        dest: 'dist/resources/'
      },
      docs: {
        expand: true,
        cwd: 'dist/',
        src: '**/*',
        dest: 'docs/'
      }
    },

    concat: {
      emojidex_js: {
        options: {
          stripBanners: true,
          banner: '<%= meta.banner %>\n */\n'
        },
        src: [
          'node_modules/bootstrap-sass/assets/javascripts/bootstrap/tab.js',
          //'node_modules/babel-polyfill/dist/polyfill.min.js', //Polyfill is already included in bootstrap
          'src/vendor/jquery-ui-1.12.0/jquery-ui.min.js',
          'node_modules/emojidex-client/dist/js/*.min.js',
          'bower_components/Caret.js/dist/jquery.caret.min.js',
          'bower_components/At.js/dist/js/jquery.atwho.min.js',
          'node_modules/clipboard/dist/clipboard.min.js',
          'src/compiled_js/**/*.js',
          'build/js/**/*.js'
        ],
        dest: 'dist/js/emojidex.js'
      },

      emojidex_css: {
        src: [
          'bower_components/At.js/dist/css/jquery.atwho.min.css',
          'src/compiled_css/emojidex.css'
        ],
        dest: 'dist/css/emojidex.css'
      }
    },

    jasmine: {
      web: {
        src: ['dist/js/emojidex.js'],
        options: {
          specs: ['spec/*.js'],
          helpers:[
            'spec/helpers/method.js',
            'spec/helpers/data.js',
            'tmp/authinfo.js',
            'node_modules/jasmine-jquery/lib/jasmine-jquery.js'
          ],
          vendor:[
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/jquery-watch/jquery-watch.min.js'
          ],
          keepRunner: true,
          outfile: 'build/_SpecRunner.html'
        }
      }
    },

    // Local dev server for live testing
    connect: {
      web: {}
    },

    // Auto re-build watcher configuration
    watch: {
      scripts: {
        files: ['src/es6/**/*.js', 'spec/**/*.js'],
        tasks: [
          'babel',
          'concat',
          'uglify',
          'jasmine'
        ],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-slim');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-md2html');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');


  grunt.registerTask('default', ['clean', 'slim', 'md2html', 'sass', 'babel', 'concat', 'uglify', 'cssmin', 'copy']);
  grunt.registerTask('spec', ['default', 'jasmine:web:build', 'jasmine']);
  grunt.registerTask('dev', ['default', 'jasmine:web:build', 'connect', 'watch']);
};
