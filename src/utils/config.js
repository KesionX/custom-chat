// 客户端配置
// const c/onfig = window.__CLIENT_CONFIG__ || {} // eslint-disable-line
import config from '@consts/config'

const host = config.ORIGIN

export default {
  ...config,
  origin: host
}
