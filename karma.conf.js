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
      // executors: 16, // Defaults to cpu-count - 1
      executors: 1, // Defaults to cpu-count - 1
      // shardStrategy: 'round-robin'
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
      {pattern: 'node_modules/clipboard/dist/clipboard.js', type: 'js'},
      {pattern: 'node_modules/cross-storage/dist/client.js', type: 'js'},
      {pattern: 'node_modules/jquery/dist/jquery.js', type: 'js'},
      {pattern: 'node_modules/jasmine-jquery/lib/jasmine-jquery.js', type: 'js'},
      {pattern: 'node_modules/jquery-watch/jquery-watch.js', type: 'js'},
      {pattern: 'node_modules/keysim/dist/keysim.js', type: 'js'},
      // {pattern: 'dist/js/emojidex.min.js', type: 'js'},
      {pattern: 'dist/js/emojidex.js', type: 'js'},
      {pattern: 'spec/helpers/data.js', type: 'js'},
      {pattern: 'build/spec/fixture/html_in_method.js', type: 'js'},
      {pattern: 'tmp/authinfo.js', type: 'js'},
      {pattern: 'dist/img/logo.png', type: 'dom'},
      {pattern: 'dist/css/document.min.css', type: 'css'},
      {pattern: 'dist/css/emojidex.min.css', type: 'css'},
      // {pattern: 'spec/emojidex-autocomplete.js', type: 'js'},
      {pattern: 'spec/palette/base.js', type: 'js'},
      // {pattern: 'spec/palette/indexes.js', type: 'js'},
      // {pattern: 'spec/emojidex-replace.js', type: 'js'}
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


    // browsers: ['Chrome'],
    browsers: ['ChromeHeadlessDisableWebSecurity'],
    customLaunchers: {
      ChromeHeadlessDisableWebSecurity: {
        base: 'ChromeHeadless',
        flags: [
          '--disable-web-security'
        ]
      }
    },


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}