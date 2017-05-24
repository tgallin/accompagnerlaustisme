const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = ({ production = false, browser = false } = {}) => {
  const bannerOptions = { raw: true, banner: 'require("source-map-support").install();' };
  const compress = { warnings: false };

  if (!production && !browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.BannerPlugin(bannerOptions),
      new LodashModuleReplacementPlugin
    ];
  }
  if (!production && browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ];
  }
  if (production && !browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV', 'MONGODB_URI', 
        'SESSION_SECRET', 
        'GOOGLE_CALLBACK', 'GOOGLE_CLIENTID', 'GOOGLE_SECRET', 
        'FACEBOOK_CALLBACK', 'FACEBOOK_CLIENTID', 'FACEBOOK_SECRET',
        'RECAPTCHA_SITE_KEY', 'RECAPTCHA_SECRET_KEY',
        'GMAIL_CLIENTID', 'GMAIL_SECRET', 'GMAIL_REFRESH_TOKEN', 'GMAIL_USER',
        'CLOUDINARY_API_KEY','CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_SECRET_KEY']),
      new webpack.BannerPlugin(bannerOptions),
      new webpack.optimize.UglifyJsPlugin({ compress }),
      new LodashModuleReplacementPlugin
    ];
  }
  if (production && browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV', 'RECAPTCHA_SITE_KEY', 'RECAPTCHA_SECRET_KEY', 'GOOGLE_ANALYTICS_ID']),
      new ExtractTextPlugin({
        filename: 'styles/main.css',
        allChunks: true
      }),
      new webpack.optimize.UglifyJsPlugin({ compress }),
      new LodashModuleReplacementPlugin
    ];
  }
  return [];
};
