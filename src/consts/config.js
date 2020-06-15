const isDev = process.env.NODE_ENV === 'development'
export default {
  // 是否是开发环境
  IS_DEV: isDev,
  // 完整域名地址 可带pathname
  ORIGIN: isDev ? 'http://localhost:3000' : window.location.origin,
}
