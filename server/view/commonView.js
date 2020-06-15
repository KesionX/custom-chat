const path = require('path')
const { client, host } = require('../config')
const { getAssets } = require('../utils/assets')
const CDN_ASSETS = require('../utils/cdn')

const root = path.resolve(__dirname, '../../')
const devMode = process.env.NODE_ENV !== 'production'
const serverHost = devMode ? '' : host

function escapeHTML(content) {
  return content.replace(/[<]/g, '\\u003c')
}

module.exports = function (props) {
  const { title, pageName, userInfo = {}, authMenu = {} } = props // 初始时userInfo为空对象

  // 获取打包好的静态资源
  const { js: { app, vendor }, css } = getAssets({ root, key: pageName }) // 返回的vendor不是完整路径，只是名字字符串
  // cdn资源
  const { styleCDN, vendorCDN } = CDN_ASSETS
  const clientConfig = `var __CLIENT_CONFIG__ = ${escapeHTML(JSON.stringify(client))}` // 服务端的客户端配置
  const user = `var __USER_INFO__ = ${escapeHTML(JSON.stringify(userInfo))}` // 登陆的用户信息
  const menu = `var __HAPPY_MENUS__ = ${escapeHTML(JSON.stringify(authMenu))}` // 权限菜单

  const cdnScript = devMode ? '' : vendorCDN
  return (
    `<html lang="zh-cmn-Hans">
      <head>
        <meta charSet="utf-8"/>
        <meta name="renderer" content="webkit"/>
        <meta name="format-detection" content="email=no,adress=no" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
        <base target="_blank">
        <title>${title}</title>
        ${styleCDN}
        ${devMode ? '' : `<link rel="stylesheet" type="text/css" href="${css}" />`}
        <script>${clientConfig}</script>
        <script>${user}</script>
        <script>${menu}</script>
      </head>
      <body>
        <div id="app"></div>
        ${cdnScript}
        <script src="${serverHost}${vendor}"></script>
        <script src="${app}"></script>
      </body>
    </html>`
  )
}
