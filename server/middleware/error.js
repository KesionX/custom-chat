const logger = require('../service/logger')

module.exports = async function (ctx, next) {
  try {
    await next()
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500
    ctx.body = err.message
    ctx.app.emit('error', err, ctx)
    if (ctx.status === 404) {
      logger.warn('404 not found: ', ctx.path)
    } else if (ctx.status >= 500) {
      logger.error('koa error: ', ctx.error ? ctx.error.stack : ctx.status)
      ctx.response.redirect('/error')
    }
  }
}
