import config from './config'

// 解析完整url链接中包含的域名信息
export const parseLink = (url) => {
  const a = document.createElement('a')
  a.href = url
  let path = a.pathname
  if (!/\/$/.test(path)) {
    path += '/'
  }
  return {
    source: url,
    protocol: a.protocol,
    hostname: a.hostname,
    port: a.port,
    search: a.search,
    path,
    hash: a.hash,
  }
}

// 解析URL地址
export function urlParser(str, key) {
  // TODO 暂时只处理search
  if (typeof str !== 'string' || !str.length) {
    return key ? null : {}
  }
  const res = str.slice(1).split('&').reduce((prev, curr) => {
    const arr = curr.split('=')
    const obj = arr.length === 2 ? { [arr[0]]: arr[1] } : {}
    return { ...prev, ...obj }
  }, {})
  return key ? res[key] : res
}

export const wrapPath = (path) => {
  const { origin } = config
  const { path: basePath } = parseLink(origin)
  return `${basePath}${path}`
}

// 支持非根域名的路径（完整路由前缀）
export function getWrappedPath(path) {
  const { origin } = config
  // console.log(origin, parseLink(origin), parseLink('http://www.xmkszz.cn/qpms'))
  const { path: basePath } = parseLink(origin)
  return `${basePath}${path}`
}
