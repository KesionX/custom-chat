import React, { Suspense } from 'react'
import { Route, Switch, Router } from 'react-router-dom'
import config from '@consts/config'
import logger from '@utils/logger'
import { MENUS } from '@consts'
import io from 'socket.io-client'
import {
  Provider,
  KeepAlive,
} from 'react-keep-alive'
import Layout from '../layout'
import history from './history'
import Routes from '../routes'
// import './index.css'
// import '../../styles/index'

// import { serviceStore } from '@stores/serviceStore'

const { ORIGIN, IS_DEV } = config
const chat = io('ws://localhost:8806/')

chat.on('connect', () => {
  console.log('connected')
})
chat.on('chat', (data) => {
  console.log('chat :', data)
})
chat.emit('login', { userId: '123' })
setTimeout(() => {
  chat.emit('join', { roomId: '123' })
}, 3000)
console.log(history)
// serviceStore.setHistory(history)

// 加载中组件
function LoadingPlaceholder() {
  return <div>Loading...</div>
}

// 对路由的path进行包装
function wrapPath(path) {
  return `/${path}`
}

// 全局路由及配置、store数据注入
export default function () {
  // not found模块也必须包括
  const contentSwitchRoutes = () => {
    // switch route数组
    const routesContent = Routes.map((route, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Route {...route} path={wrapPath(route.path)} key={index} />
    ))

    return (
      <Switch>
        {routesContent}
      </Switch>
    )
  }

  return (
    <Provider>
      <Layout menus={MENUS} history={history}>
        <Suspense fallback={<LoadingPlaceholder />}>
          <Router history={history}>
            {contentSwitchRoutes()}
          </Router>
        </Suspense>
      </Layout>
    </Provider>
  )
}
