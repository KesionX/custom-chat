// import chatSDK from './chatsdk'


const Koa = require('koa')
const serve = require('koa-static')
const koaBody = require('koa-body')
// const KoaSession = require('koa-session')
const { resolve } = require('path')

const { chatSDK } = require('./chatsdk')


const app = new Koa()
const { port, proxy, session } = require('./config')
const router = require('./service/router')
const proxyMiddleware = require('./middleware/proxy')
const errorMiddleware = require('./middleware/error')

const env = process.env.NODE_ENV

// 代理转发
app.use(proxyMiddleware(proxy))

// body parser
app.use(koaBody({ multipart: true, strict: false, jsonLimit: '10mb' }))

// 静态服务初始化
const staticPath = resolve(__dirname, '../dist')
app.use(serve(staticPath, { maxage: 30 * 24 * 3600 * 1000 })) // 30天

// 404 && 500 处理
app.use(errorMiddleware)

// 全局路由初始化
router.use(app)
// router.use('/', (ctx, ))
// eslint-disable-next-line import/order
const server = require('http').Server(app.callback())
// console.log(server)
chatSDK.init(server)

server.listen(port, () => {
  console.log(`node service listening on port ${port}...`)
})