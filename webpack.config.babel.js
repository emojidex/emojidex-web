import path from 'path'
import webpack from 'webpack'

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
    path: path.join(__dirname, './dist/js'),
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
  // plugins: [
  //   new webpack.ProvidePlugin({
  //     $: 'jquery',
  //     'window.$': 'jquery'
  //   })
  // ],
  node: {
    fs: 'empty'
  }
})