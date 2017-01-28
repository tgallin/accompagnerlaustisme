var path = require('path');
var webpack = require('webpack');

var commonConfig = require('./common.config');

var commonLoaders = commonConfig.commonLoaders;
var publicPath = commonConfig.output.publicPath;
var externals = commonConfig.externals;
var postCSSConfig = commonConfig.postCSSConfig;

module.exports = {
  // The configuration for the server-side rendering
  name: 'server-side rendering',
  context: path.join(__dirname, '..', 'app'),
  entry: {
    server: '../server/index'
  },
  target: 'node',
  node: {
    __dirname: false
  },
  devtool: 'sourcemap',
  output: {
    // The output directory as absolute path
    path: path.join(__dirname, '..', 'compiled'),
    // The filename of the entry chunk as relative path inside the output.path directory
    filename: '[name].dev.js',
    // The output path from the view of the Javascript
    publicPath: publicPath,
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: commonLoaders.concat({
      test: /\.css$/,
      loader: 'css/locals?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
    })
  },
  resolve: {
    root: [path.join(__dirname, '..', 'app')],
    extensions: ['', '.js', '.jsx', '.css'],
  },
  externals: externals,
  plugins: [
    new webpack.DefinePlugin({
      __DEVCLIENT__: false,
      __DEVSERVER__: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.MONGODB_URI': JSON.stringify(process.env.MONGODB_URI || "mongodb://localhost:27017/accompagnerlautisme"),
      'process.env.SESSION_SECRET': JSON.stringify(process.env.SESSION_SECRET),
      'process.env.GOOGLE_CALLBACK': JSON.stringify(process.env.GOOGLE_CALLBACK),
      'process.env.GOOGLE_CLIENTID': JSON.stringify(process.env.GOOGLE_CLIENTID),
      'process.env.GOOGLE_SECRET': JSON.stringify(process.env.GOOGLE_SECRET)
    }),
    new webpack.IgnorePlugin(/vertx/),
    new webpack.BannerPlugin(
      'require("source-map-support").install();', {
        raw: true,
        entryOnly: false
      }
    )
  ],
  postcss: postCSSConfig
};
