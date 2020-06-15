import React, { useState, useRef } from 'react'
import { Mask } from '../mask'
import './index.css'

const SignUp = ({ onClose, visible = true }) => {
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)
  const [errMsg, setErrMsg] = useState('')
  const handleLogin = () => {
    const username = (usernameRef.current.value || '').trim()
    const password = (passwordRef.current.value || '').trim()
    if (!username || !password) {
      setErrMsg('账号或密码不得为空！')
      return
    }
    setErrMsg('系统维护中，请稍后重试！')
  }

  const handleForget = () => {
    setErrMsg('系统维护中，请稍后重试！')
  }

  return (
    <Mask visible={visible}>
      <div className="sign-wrapper">
        <span className="sign-close" onClick={onClose} />
        <h1>账号登录</h1>
        <div className="sign-username">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAAS1BMVEUAAADd3d3d3d3d3d3c3Nzd3d3e3t7c3Nzc3Nzd3d3e3t7c3Nzd3d3e3t7X19fc3Nzc3Nzd3d3d3d3c3Nzd3d3b29vf39/d3d3d3d3GkO5WAAAAGHRSTlMA7pYgUCUczb+biYNKRAnp38p+dmg/EPXAfGW0AAAAfElEQVQY03WOSQ7DMAwDKdmW4zV72v+/tKghBcghc9GAAE1jEHj5LBxwU6mEHgpVKEJt3EaiSU4qKatMXsVPr0lmFbaWo3PckxwUT5uD28jDuPj7hy8ox5yqdKlpPvS9aN8PcWzsa4fR1x0QHbBZQeGhBhfE9khahJXu2g83gQOaFkSD1AAAAABJRU5ErkJggg==" alt="" />
          <input placeholder="支持邮箱/用户名/已验证手机号" type="text" ref={usernameRef} onFocus={() => setErrMsg('')} />
        </div>
        <div className="sign-password">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAASCAMAAACKJ8VmAAAAPFBMVEUAAADc3Nzd3d3e3t7e3t7d3d3c3Nzd3d3c3Nzc3Nzc3Nzb29vc3Nzd3d3c3Nzc3Nzd3d3e3t7e3t7c3NybGuC5AAAAE3RSTlMA84ZsD4C1qurk3MjGeV5XPDYfTja/XgAAAGFJREFUGNOdjUkOgDAIRaGgtfN0/7sai5I03fk2/DzCBybNOnS2gXL4zMDZH5+gwHNyIJBwdRD6Jati9dyWOZJRY5L0SqHGSudJL0+sgGYFYcDKUEObGb8MbobV7N8jrsQbNQIDVZSIaI8AAAAASUVORK5CYII=" alt="" />
          <input placeholder="密码" type="password" ref={passwordRef} onFocus={() => setErrMsg('')} />
        </div>
        <p className="sign-forget" onClick={handleForget}>忘记密码?</p>
        <p className="sign-err-msg">{errMsg}</p>
        <button type="button" onClick={handleLogin}>立即登录</button>
      </div>
    </Mask>
  )
}

export default SignUp
