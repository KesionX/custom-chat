import config from '@consts/config'

const { IS_DEV } = config

let i = 0
class Logger {
  constructor() {
    Object.keys(console).forEach((key) => {
      Object.defineProperty(this, key, {
        writable: false,
        configurable: false,
        // IS_DEV
        // eslint-disable-next-line
        value: IS_DEV ? (...args) => console[key].call(console, ...args) : () => {
          if (i < 1) {
            // eslint-disable-next-line
            console.warn('console was disabled!!')
            i += 1
          }
        },
        enumerable: true
      })
    })
  }

  // 单例
  static getInstance() {
    let instance
    return (function _() {
      if (instance) {
        return instance
      }
      instance = new Logger()
      return instance
    }())
  }
}

const logger = Logger.getInstance()

export default logger
