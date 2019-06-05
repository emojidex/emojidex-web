import path from 'path'
import webpack from 'webpack'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'

module.exports = (env, argv) => ({
  entry: {
    'emojidex': './src/es6/index.js',
  },
  resolve: {
    modules: [
      'node_modules'
    ]
  },
  output: {
    filename: `emojidex.${argv.mode === 'production' ? 'min.' : ''}js`,
    path: path.join(__dirname, './docs/js'),
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 8080,
      server: { baseDir: ['docs'] }
    })
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   'window.$': 'jquery'
    // })
  ],
  node: {
    fs: 'empty'
  }
})