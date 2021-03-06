const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackDevPlugin = require('webpack-dev-server')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const config = {
  entry: {
    child: './src/child/child.js'
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/asset/' // 这个用不利索呢
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
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
    new UglifyJSPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.DefinePlugin(
      {
        'process.env.NODE_ENV': JSON.stringify('development')
      }
    ),
    // webpack最闪耀的点：代码分割
    // 既然此插件是为了代码去重，常配合entry手动配置方式，那么我用动态分离方式就不需要他了
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common' // 指定公共 bundle 的名称。
    // })
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

console.log(process.env.NODE_ENV)