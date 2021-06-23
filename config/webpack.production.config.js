const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');
const common = require('./webpack.common.config.js');

module.exports = merge(common, {
  mode: 'production',
  cache: {
    type: 'filesystem',
  },
  output: {
    filename: 'js/[name].[contenthash:8].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(sass|css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'thread-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          test: /[/\\]node_modules[/\\]/,
          name: 'common',
          chunks: 'all',
        },
      },
    },
    //runtimeChunk: 'single',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
      ignoreOrder: false,
    }),
    // new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime~.+[.]js/]),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
    new RemovePlugin({
      before: {
        test: [
          {
            folder: 'dist',
            method: (absoluteItemPath) =>
              new RegExp(/[*.]/).test(absoluteItemPath),
            recursive: true,
          },
        ],
      },
    }),
  ],
});
