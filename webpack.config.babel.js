import path from 'path'
import webpack from 'webpack'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

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
    filename: `js/emojidex.${argv.mode === 'production' ? 'min.' : ''}js`,
    path: path.join(__dirname, './docs'),
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/pug/index.pug',
      inject: false
    }),
    new HtmlWebpackPlugin({
      filename: 'ajax_test.html',
      template: 'src/pug/ajax_test.pug',
      inject: false
    }),
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