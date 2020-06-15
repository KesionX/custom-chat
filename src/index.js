import 'babel-polyfill'
import 'es5-shim'
import 'es5-shim/es5-sham'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './container/app'
import './styles/reset.css'
import './styles/index.css'

// webpack 打包入口文件
ReactDOM.render(<App />, document.getElementById('app'))
