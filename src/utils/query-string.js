/* eslint-disable */
export default {
  parse: (queryString) => {
    let resultObj = {}
    //例如传入的参数为：？name=jack&age=12
    //格式正确的queryString最多只可能在字符串第一个位置出现问号，因此，先直接将search中的？替换为空串      =====> name=jack&age=12
    queryString = queryString.replace(/\?/g, '')
    //按&符号拆分成后面展示的数组   ==========================>[name=jack,age=12]
    let searchObj = queryString.split('&')
    //遍历数组，将生成所需对象
    searchObj.length && searchObj.map(queryItem => {
        let queryItemArr = queryItem.split('=')
        //判断按等号分割之后，是否正常，如果存在分割之后长度不等于2，则说明该项查询参数格式存在问题，则不添加到返回的对象中
        if (queryItemArr.length === 2)
            resultObj[queryItemArr[0]] = queryItemArr[1]
        else
            console.error(`转换失败！${queryItem}===>这项查询字符串格式有误，请检查数据格式，异常信息\n${new Error().name}\n${new Error().stack}`)
    })
    return resultObj
  },

  stringify: (query) => {
      /*注意：Object.keys(query).filter(key => query[key]).map(keyName => `${keyName}=${query[keyName]}`).join('&')
      filter中的返回代码：【query[key]】不能这样写，这样的话，如果遇到其中有个值为0的时候，也会被隐式类型转换，这样的话，值为0的请求参数也会被过滤了
       */
      return Object.keys(query).filter(key => query[key] !== undefined).map(keyName => `${keyName}=${query[keyName]}`).join('&')
  }
}
