const fs = require('fs')
const path = require('path')

const router = require('koa-router')()

// 读取 controller 目录配置的路由信息
function initController() {
  let result = []
  const absolutePath = path.join(__dirname, '../controller')
  const routerFileList = fs.readdirSync(absolutePath)
  routerFileList.forEach((file) => {
    // 加载每个路由配置文件
    const routerConfig = require(path.join(absolutePath, file)) // eslint-disable-line
    if (routerConfig && routerConfig.length) {
      result = result.concat(routerConfig)
    }
  })
  return result
}

function render(ctx, View) {
  return (props) => {
    ctx.type = 'text/html'
    ctx.body = `<!DOCTYPE html>${View(props)}`
  }
}

function initRouter(routerConfig) {
  routerConfig.forEach((config) => {
    const { method = 'get', view = 'index.js', controller } = config
    // 定位到具体view/下的页面
    const Page = require(path.join(__dirname, '../view', view))  // eslint-disable-line
    router[method.toLowerCase()](config.path, async (ctx, next) => {
      ctx.set('Cache-Control', 'no-cache, no-store, must-revalidate')
      ctx.render = render(ctx, Page)
      const result = await controller.call(ctx, next)
      // 如果 controller 中有 return value 而不是直接调用 render 方法
      // 表示这个 route 是要返回数据而不是页面
      if (typeof result !== 'undefined') {
        ctx.type = 'application/json'
        ctx.body = result
      }
    })
  })
}

const routes = initController()

module.exports = {
  routes,
  use(app) {
    initRouter(routes)
    app.use(router.routes()).use(router.allowedMethods())
  }
}
