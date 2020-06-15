module.exports = [
  {
    // 客服登入
    path: '/w/login',
    method: 'POST',
    auth: false,
    // async controller() {
    //   const params = this.request.body
    //   const { account, password } = params
    //   const res = await API.login.loginIn(account, password)
    //   if (res.code === API_CLIENT_CODE.OK) { // 登陆成功
    //     saveCookie(socket.jwtCookie, res.data.token, this)
    //   }
    //   console.log(res)
    //   return res
    // }
  },

]
