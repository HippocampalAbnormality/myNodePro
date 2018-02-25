const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackDevPlugin = require('webpack-dev-server')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const config = {
  entry: {
    child: './src/child/child.js'
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'] // 坑，这个@babel/preset-env是对应的package中的依赖包，看清，版本不对就有问题
          }
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpeg|svg|gif)$/i,
        use: ['file-loader']
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}

// module.exports = config
const options = {
  contentBase: './dist',
  inline: true,
  compress: true,
  hot: true,
  host: 'localhost'
}

// 此监听配合webpack.HotModuleReplacementPlugin()插件实现热更新
WebpackDevPlugin.addDevServerEntrypoints(config, options)

const compiler = webpack(config)
const server = new WebpackDevPlugin(compiler, options)

server.listen('9999', '0.0.0.0', () => {
  console.log('dev server listening on port 9999');
})