// antd css 样式文件
const styleCDN = '<link rel="stylesheet" href="https://cdn.staticfile.org/antd/4.1.0/antd.min.css">'

// 保险链接，防止某一CDN挂了，暂未使用
const insurance = `
  <script>
    window.antd || document.write('<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.23.6/antd.min.js" />')
  </script>
`

// antd react react-dom lodash 资源。之前项目都是打包进vendor，现在改用cdn资源。
const vendorCDN = `
  <script crossorigin src="https://unpkg.com/react@16.12.0/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16.12.0/umd/react-dom.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/lodash@4.17.15/lodash.min.js"></script>
  <script crossorigin src="https://cdn.bootcss.com/babel-polyfill/7.6.0/polyfill.min.js"></script>
  <script crossorigin src="https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js"></script>
  <script crossorigin src="https://cdn.bootcss.com/moment.js/2.24.0/locale/zh-cn.js"></script>
    <!--  antd 3.x 版本，所以还要引入polyfills和moment-->
  <script crossorigin src="https://cdn.staticfile.org/antd/4.1.0/antd.min.js"></script>
`

module.exports = {
  styleCDN,
  vendorCDN
}
