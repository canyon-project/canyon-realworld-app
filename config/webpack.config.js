const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  entry: './src/main.tsx',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "static/js/main.[hash].chunk.js",
    publicPath:"/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use:['babel-loader'],
        exclude:'/node_modules/'
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg|eot|ttf|woff)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: 'static/media',
            },
          },
        ],
      }
    ]
  },
  // 文件引用不需要后缀名
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  // 本地开发服务
  devServer: {
    host: "0.0.0.0",//允许ip访问
    hot: true, // 模块热替换机制
    port: 9050,
    open: false, // 打开浏览器，默认false
    // https:true
  },
  // 插件配置处~
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/main.[hash].chunk.css"
    }),
    new WebpackBar(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          filter: async (resourcePath) => {
            if (resourcePath.includes('public/index.html')) {
              return false;
            }
            return true;
          },
        }],
    }),
  ],
  devtool: "source-map",
  mode: "development"
}
