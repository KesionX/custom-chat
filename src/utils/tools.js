import QueryString from '@utils/query-string'
import logger from './logger'
import config from './config'
// import { parseLink } from './url'


/**
 * @description 首字母大写
 * @param {String} str 要处理的字符
 */
export function upperFirst(str) {
  if (!str || typeof str !== 'string') return str
  return str.substring(0, 1).toUpperCase() + str.substring(1)
}

/**
 * @description 解析完整url链接中包含的域名信息
 * @param {String} url 地址
 */
export function parseLink(url) {
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


/**
 * @description 获取包含主域名路径的路由地址
 * @param {String} path
 * @returns {String}
 * */
export const wrapPath = (path) => {
  const { origin } = config
  const { path: basePath } = parseLink(origin)
  return `${basePath}${path}`
}

/**
 * @description 获取查询字符串的值
 * @param {String} str 查询字符串
 * @param {*} key 要获取的键
 */
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

/**
 * @description 生成随机整数 包含区间[min, max]
 * @param {Number} min 最小数
 * @param {Number} max 最大数
 */
export const randomIntNum = (min, max) => Math.floor(Math.random() * (max - min)) + min

/**
 * @description 获取图片尺寸
 * @param {String} url 图片地址
 * @returns {Promise}
 */
export const loadImage = (url) => {
  const img = new Image()
  // 先设置跨域 再设置链接
  img.setAttribute('crossOrigin', 'anonymous')
  img.src = url
  return new Promise((resolve, reject) => {
    img.onload = () => {
      resolve({ width: img.width, height: img.height, img })
    }
    img.onerror = () => {
      resolve({ img })
    }
  })
}
