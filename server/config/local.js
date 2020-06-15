// 需要在其他电脑、手机上访问时，可将 host 修改为本机 ip
// const localHost = '192.168.3.16'
const localHost = 'http://localhost'
const localPort = 8806

// 开发环境
const host = `${localHost}:${localPort}`

// api服务器地址
const serverHost = 'http://118.190.97.137:8811'

module.exports = {
  host,
  port: localPort,
  serverHost,
  // 请求代理配置 与proxy中间件相关
  proxy: [
    {
      // match: String | RegExp 待匹配的路径
      match: '/api/',
      // url: String 要代理到的 url
      url: serverHost,
      callback: path => path.replace('/api', '')
    }
  ],
  client: {
    env: 'local',
    fetchUrl: `${host}/api`, // 提供给client的request使用
    host: `${host}`, // 提供给client获取pathname 不加斜杠
    // debug: false,
    debug: true, // 是否开启开发环境调试
    logLevel: 'TRACE', // 客户端日志打印等级
  }
}
