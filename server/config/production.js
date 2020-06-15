// node服务器
const deployHost = 'http://118.190.99.107'
const deployPort = 8807 // 部署的服务器端口

const host = `${deployHost}:${deployPort}`

// 后端api地址
const serverHost = 'http://118.190.97.137:8811'

module.exports = {
  host,
  port: deployPort,
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
  // 暴露给client的数据
  client: {
    env: 'production',
    fetchUrl: `${host}/api`, // 提供给client的request使用
    host, // 提供给client获取pathname 不加斜杠
    debug: false, // 是否开启开发环境调试
    logLevel: 'WARN' // 客户端日志打印等级
  }
}
