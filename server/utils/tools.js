const crypto = require('crypto')

function md5(val, secret) {
  const _md5 = crypto.createHash('md5')
  _md5.update(secret)
  return _md5.digest('hex').toUpperCase()
}


function removeIds(obj) {
  function getType(o) {
    if (o === null) return 'Null'
    if (o === undefined) return 'Undefined'
    return Object.prototype.toString.call(o).slice(8, -1)
  }
  let result = obj

  const oType = getType(obj)
  if (oType === 'Object') {
    result = {}
    Object.keys(obj).forEach((key) => {
      if (key !== '_id') {
        result[key] = removeIds(obj[key])
      }
    })
    return result
  }
  if (oType === 'Array') {
    result = []
    if (oType.length > 0) {
      result = obj.map(item => removeIds(item))
    }
  }
  return result
}
module.exports = {
  md5,
  removeIds
}
