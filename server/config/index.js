const { merge } = require('lodash')
const defaultConfig = require('./default')

const env = process.env.NODE_ENV // local production

let envConfig = {}
try {
  env && (envConfig = require(`./${env}`))
} catch (e) {
  console.error(`config ${env}.js is not exist `)
}

module.exports = merge({}, defaultConfig, envConfig)
