const request = require('request')

// 匹配 url
const getProxyItem = (ctx, config) => {
  let url = null
  let host = null
  config.forEach((rule) => {
    url === null && rule.match.forEach((item) => {
      if (url === null && item.test(ctx.path)) {
        const callbackUrl = rule.callback(ctx.url)
        const serviceUrl = rule.url
        host = serviceUrl.slice(serviceUrl.indexOf('://') + 3).replace(/\/.*$/, '')
        url = `${rule.url}${typeof callbackUrl === 'string' ? callbackUrl : ctx.url}`
      }
    })
  })
  return url ? { host, url } : null
}

const getParsedBody = (ctx) => {
  const body = ctx.request.body
  if (body === undefined || body === null) {
    return undefined
  }
  if (Buffer.isBuffer(body) || typeof body === 'string') {
    return body
  }
  if (typeof body === 'object' && Object.keys(body).length === 0) {
    return undefined
  }
  const contentType = ctx.request.header['content-type']
  if (contentType && contentType.indexOf('json') !== -1) {
    return JSON.stringify(body)
  }
  return `${body}`
}

// pipe 各类流式数据
const pipeRequest = (ctx, option) => new Promise((resolve, reject) => {
  ctx.req.pipe(
    request(option, (err, stat) => {
      if (err) reject(err)
      else resolve(stat)
    })
  )
})

const send = option => new Promise((resolve, reject) => {
  request(option, (err, stat) => {
    if (err) reject(err)
    else resolve(stat)
  })
})

module.exports = function proxy(config) {
  // 校验入参
  if (!Array.isArray(config)) {
    if (typeof config !== 'object') {
      throw new Error('config is invalid, koa2-proxy middleware init failed!')
    }
    config = [config]
  }
  // 规范入参
  const proxyConfig = config.reduce((prev, rule) => {
    let match = Array.isArray(rule.match) ? rule.match : [rule.match]
    let url
    match = match.map((item) => {
      console.log(item);
      if (typeof item === 'string') {
        return new RegExp(item)
      } else if (item instanceof RegExp) {
        return item
      } else {
        throw new Error('config.match is invalid, koa2-proxy middleware init failed!')
      }
    })

    if (typeof rule.url === 'string') {
      url = rule.url
    } else {
      throw new Error('config.url is invalid, koa2-proxy middleware init failed!')
    }
    const callback = typeof rule.callback === 'function' ? rule.callback : path => path
    prev.push({ match, url, callback })
    return prev
  }, [])

  return (ctx, next) => {
    const proxyItem = getProxyItem(ctx, proxyConfig)
    if (!proxyItem) return next().then()

    const parsedBody = getParsedBody(ctx)
    const headers = ctx.header
    headers.host = proxyItem.host
    const option = {
      url: proxyItem.url,
      host: proxyItem.host,
      headers,
      encoding: 'utf-8',
      followRedirect: true,
      method: ctx.method,
      gzip: true,
      body: parsedBody
    }

    let reqPromise
    if (parsedBody) {
      reqPromise = send(option)
    } else {
      reqPromise = pipeRequest(ctx, option)
    }

    return reqPromise.then((res) => {
      ctx.status = res.statusCode
      Object.keys(res.headers).forEach((name) => {
        if (!(name === 'transfer-encoding' || name === 'content-encoding')) {
          ctx.set(name, res.headers[name])
        }
      })
      ctx.body = res.body
    })
  }
}
