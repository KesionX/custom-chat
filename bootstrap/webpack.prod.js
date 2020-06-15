const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

process.env.NODE_ENV = 'production'

const root = path.resolve(__dirname, '../')

module.exports = {
  target: 'web',
  entry: {
    index: './src/index.js',
    // vendor: [
    //   'react',
    //   'react-dom',
    //   'react-router',
    //   'react-router-dom',
    // ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name]_[contenthash:5].js',
    // 需要用到'http://xxx.xxx.xx.xx:8880/' 带后缀‘/’
    // 要打包上传到京东时 publicPath请勿使用'./' 或者cdn资源地址会出错
    // publicPath: './',
  },
  // 使用分包
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: { // 项目基本框架等
          chunks: 'all',
          test: /(react|react-dom|react-router|react-dom-router|babel-polyfill|mobx)/,
          priority: 100,
          name: 'vendors',
          automaticNameDelimiter: '_',
        },
        'async-commons': { // 异步加载公共包、组件等
          chunks: 'async',
          minChunks: 2,
          name: 'async-commons',
          priority: 90,
          automaticNameDelimiter: '_',
        },
        commons: { // 其他同步加载公共包
          chunks: 'all',
          minChunks: 2,
          name: 'commons',
          priority: 80,
          automaticNameDelimiter: '_',
        },
        // vendors: {
        //   test: /[\\/]node_modules[\\/]/,
        //   name: 'vendor',
        //   chunks: 'initial',
        //   minChunks: 2,
        //   automaticNameDelimiter: '_',
        // }
      }
    }
  },

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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
              publicPath: '../',
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                // eslint-disable-next-line global-require
                require('postcss-preset-env')(),
              ]
            }
          }
        ],
      },
      {
        // 处理图片资源
        test: /\.(jpg|png|jpeg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[name]_[hash:5].[ext]',
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
        exclude: /\.(html|js|png|jpg|jpeg|gif|css|less)$/,
        loader: 'file-loader',
        options: {
          name: '[name]_[hash:10].[ext]',
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
      // 保证将所需的chunks一次性引入
      chunks: ['index', 'vendor', 'vendors', 'async-commons', 'commons'],
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    }),
    // 抽离css
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
    }),
    new webpack.NamedChunksPlugin(),
    new OptimizeCssAssetsWebpackPlugin(),
    new UglifyJsPlugin({
      uglifyOptions: {
        ie8: true,
      },
    }),
  ],
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
  mode: 'production',
  // devtool: 'cheap-module-source-map',
  devtool: false,
}
