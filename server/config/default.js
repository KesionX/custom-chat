module.exports = {

  port: 8880,

  /* 服务器上的日志目录 */
  log: {
    path: './logs'
  },

  /* 向页面中注入的全局变量 */
  client: {},
  /* 默认代理 */
  proxy: {},

  cookie: {
    name: 'token',
    prefix: '',
    path: '/',
    timeout: 1000 * 3600 * 24 * 7, // seven day
    domain: '',
    httpOnly: true // 设置此值使得使用js脚本无法获取到cookie，防止xss攻击
  },

  socket: {
    cookieSecret: '@TC_FE', // JWT 加密密钥
    pwdSecret: '@tc_fe', // 用户密码加密密钥
    jwtExpired: 3600 * 12, // 12小时 jwt过期时间 单位秒
    jwtCookie: {
      name: 'iToken',
      prefix: '',
      path: '/',
      timeout: 1000 * 3600 * 24 * 7,
      domain: '',
      httpOnly: true
    },
  },

  session: {
    key: 'chat:sess', // cookie key (default is koa:sess) 默认
    maxAge: 1000 * 3600 * 24, // cookie 的过期时间 maxAge in ms (default is 1 days)
    overwrite: true, // 是否可以 overwrite (默认 default true)
    httpOnly: true, // cookie 是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true, // 签名默认 true
    rolling: false, // 在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false） 【需要修改 跟下面的二选一】
    renew: true, // 等快要到期时重置 ☆前提是你此次请求的session还没有过期 然后在发请求的时候会给你重置为新的  【需要修改】
  }
}
