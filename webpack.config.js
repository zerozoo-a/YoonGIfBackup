const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// const isDevelopment = process.env.NODE_ENV !== 'production';
const isDevelopment = process.env.NODE_ENV === 'production';
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
//use only test
console.log(isDevelopment);
module.exports = {
  name: 'setVersionTest',
  mode: isDevelopment ? 'development' : 'production',
  // mode: isDevelopment ? 'production' : 'development',
  // mode: 'production',
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx', 'json'],
  },
  entry: './client.jsx',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              // plugins: [
              //   isDevelopment && require.resolve('react-refresh/babel'),
              // ].filter(Boolean),
              // My guess is that you've included the react-refresh/babel plugin
              // to process node_modules. This will break because some code (as used by Webpack and WDS) will inevitably run before the plugin.
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  plugins: [
    ['@babel/plugin-transform-runtime'],
    {
      regenerator: true,
      corejs: 3,
    },
  ],
  plugins: [
    // new BundleAnalyzerPlugin(),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  //use only test
  output: {
    filename: 'client.js',
    // chunkFilename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
  },
  devServer: {
    port: 9000,
    publicPath: '/dist/',
    hot: true,
  },
  optimization: {
    // runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          // test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          test: /[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
};

// optimization: {
//   // runtimeChunk: "single",
//   splitChunks: {
//     cacheGroups: {
//       vendor: {
//         // test:/[\\/]node_modules[\\/](react|react-dom)[\\/]/,
//         test: /[\\/](react|react-dom)[\\/]/,
//         name: "vendor",
//         chunks: "all",
//       },
//     },
//   },
// },
//optimizationEnd,
