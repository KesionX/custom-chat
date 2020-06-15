import { lazy } from 'react'

const Home = lazy(
  () => import(
    /* webpackChunkName: "home" */
    '../../indexs/home'
  )
)

const Custom = lazy(
  () => import(
    /* webpackChunkName: "home" */
    '../../indexs/custom'
  )
)

const CustomChat = lazy(
  () => import(
    /* webpackChunkName: "home" */
    '../../indexs/custom-chat'
  )
)

const NotFound = lazy(
  () => import(
    /* webpackChunkName: "home" */
    '../../indexs/not-found'
  )
)


export default [
  // {
  //   path: '',
  //   exact: true,
  //   component: Welcome
  // },
  {
    path: 'home',
    exact: true,
    component: Home
  },
  {
    path: 'custom/chat',
    exact: true,
    component: CustomChat
  },
  {
    path: '',
    exact: false,
    component: NotFound
    // component: NotFound
  },
  {
    path: '',
    exact: false,
    component: Custom
  }
]
