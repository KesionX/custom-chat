const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

process.env.NODE_ENV = 'development'

const root = path.resolve(__dirname, '../')

module.exports = {
  target: 'web',
  entry: {
    index: './src/index.js',
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name]_[contenthash:5].js',
    // 需要用到'http://xxx.xxx.xx.xx:8880/' 带后缀‘/’
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }, // 多个css分离打包

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          // 自动修复错误
          fix: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          // 预设：指示babel做怎么样的兼容处理
          presets: [
            [
              '@babel/preset-env',
              {
                // 按需加载兼容性
                useBuiltIns: 'usage',
                // 指定core-js版本
                corejs: {
                  version: 3
                },
                modules: false, // babel不做模块转换工作（webpack来处理）
                // 指定兼容性做到哪个版本浏览器
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ],
          // 提供对es6类属性的转译支持
          plugins: [
            'transform-class-properties',
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            '@babel/plugin-syntax-dynamic-import',
            ['@babel/plugin-proposal-class-properties', { loose: true }],
          ]
        }
      },
      {
        // 处理css资源
        test: /\.css$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      },
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[name].[hash:5].[ext]',
          // 关闭es6模块化
          esModule: false,
          // 指定输出目录
          outputPath: 'img'
        }
      },
      {
        // 处理html内img图片资源
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        // 处理其他资源
        exclude: /\.(html|js|png|jpg|gif|css|less)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:10].[ext]',
          outputPath: 'plugin/assets'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/template/index.html',
      filename: 'index.html',
      chunks: ['index'] // 对应entry->main.js
    }),
    // 抽离css
    new MiniCssExtractPlugin({
      // 对输出文件重命名
      filename: 'css/main.css',
      // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
      publicPath: './'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    compress: true,
    port: 3001,
    open: true,
    // 为使用移动端调试
    // host: '0.0.0.0',
    // 解决react-router配置不生效的问题
    historyApiFallback: {
      index: '/index.html' // 指向HtmlWebpackPlugin.filename
    }
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      mobx: path.resolve(root, 'node_modules/mobx/lib/mobx.es6.js'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@consts': path.resolve(__dirname, '../src/consts'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@stores': path.resolve(__dirname, '../src/stores'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
      '@libs': path.resolve(__dirname, '../src/lib'),
    }
  },
  devtool: 'eval-source-map',
  mode: 'development'
}
