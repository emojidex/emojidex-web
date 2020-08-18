// Karma configuration
// Generated on Fri Jun 28 2019 11:40:50 GMT+0900 (JST)
process.env.CHROME_BIN = require('puppeteer').executablePath()
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    browserNoActivityTimeout: 60000,


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['parallel', 'jasmine', 'stacktrace'],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-parallel',
      'karma-stacktrace'
    ],
    parallelOptions: {
      executors: 8, // Defaults to cpu-count - 1
      shardStrategy: 'round-robin'
      // shardStrategy: 'description-length'
      // shardStrategy: 'custom'
      // customShardStrategy: function(config) {
      //   config.executors // number, the executors set above
      //   config.shardIndex // number, the specific index for the shard currently running
      //   config.description // string, the name of the top-level describe string. Useful for determining how to shard the current specs
      //   return config.
      // }
    },
    client: {
      jasmine: {
        random: false
      }
    },


    // list of files / patterns to load in the browser
    files: [
      'node_modules/clipboard/dist/clipboard.js',
      'node_modules/cross-storage/dist/client.js',
      'node_modules/jquery/dist/jquery.js',
      'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
      'node_modules/jquery-watch/jquery-watch.js',
      'node_modules/keysim/dist/keysim.js',
      'dist/js/emojidex.js',
      'spec/helpers/data.js',
      'build/spec/fixture/html_in_method.js',
      'tmp/authinfo.js',
      'dist/img/logo.png',
      'dist/css/document.min.css',
      'dist/css/emojidex.min.css',
      'spec/emojidex-autocomplete.js',
      'spec/palette/*.js',
      'spec/emojidex-replace.js'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}