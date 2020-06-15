const path = require('path')

const devMode = process.env.NODE_ENV !== 'production'

function returnFirstArg(argOne) { return argOne }

function generateFullPath(asset) { // 获取静态资源的绝对路径
  return asset.indexOf('http') === 0 ? asset : `/${asset}`
}

function loadFile(filePath) {
  let cache = null
  return function () {
    if (devMode) {
      cache = null
      delete require.cache[filePath]
    }
    // 被引入的模块将被缓存在这个对象中。 从此对象中删除键值对将会导致下一次 require 重新加载被删除的模块。
    if (cache) return cache
    cache = require(filePath) // eslint-disable-line
    return cache
  }
}

/**
 * @description Assets 返回一个获取 assets 地址的函数
 * @param {Object} webpackAssets 由 assets-webpack-plugin 生成的 JSON 内容,详见 {@link ../assets.json}
 * @param {Function} [baseParser] 用于处理结果的后置函数
 * @returns {Function}
 * @constructor
 */
function getAssetsInfo(webpackAssets, baseParser = returnFirstArg) {
  /**
   * @description 获取资源地址
   * @link webpack/assets.json
   * @param {String} chunkName 入口资源的名字
   * @param {String} [kind] 资源类型
   * @returns {String} 资源地址
   * @throw {ReferenceError} 未找到指定资源
   */
  return function generatePath(chunkName, kind = 'js') {
    if (!webpackAssets[chunkName] || !webpackAssets[chunkName][kind]) {
      throw new ReferenceError(`["${chunkName}"]["${kind}"] is not in assets object.`)
    }
    return baseParser(webpackAssets[chunkName][kind])
  }
}

// 读取vendor文件中的某一属性对应的值，处理后返回
function getVendorPath(vendorInfo, baseParser = returnFirstArg) {
  const vendorFileName = `${vendorInfo.name}.js`
  return baseParser(vendorFileName)
}

// 主函数
function getAssets({ root, key, other }) {
  const assetsPath = path.resolve(root, 'dist/assets.json') // 静态资源json映射地址
  const vendorPath = path.resolve(root, 'dist/vendor.json') // 静态资源基础库地址
  try {
    const assetsInfo = loadFile(assetsPath)() // 静态资源json文件
    const vendorInfo = loadFile(vendorPath)() // 静态资源vendor文件
    const getAssetsPath = getAssetsInfo(assetsInfo, generateFullPath) // generatePath函数
    const result = {
      js: {
        app: getAssetsPath(key, 'js'),
        vendor: getVendorPath(vendorInfo, generateFullPath)
      },
      css: devMode ? '' : getAssetsPath(key, 'css'), // 开发环境下不存在css资源
    }
    if (other) {
      result.js.other = getAssetsPath(other, 'js')
    }
    return result
  } catch (e) {
    console.error('getAssets error: ', e)
  }
  return { js: { app: '', vendor: '' }, css: '' }
}

module.exports = { getAssets }
