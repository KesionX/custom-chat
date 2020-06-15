import React, { Component, Fragment } from 'react'
import * as PropTypes from 'prop-types'
import { Layout, Button } from 'antd'
import './index.css'
import Picker from 'emoji-picker-react'

const { Sider, Content } = Layout

class MessageInput extends Component {
  state = {
    visible: false,
    value: ''
  }

  componentDidMount() {

  }

  // 获取光标位置
  getPositionForTextArea = (ctrl) => {
    const CaretPos = {
      start: 0,
      end: 0
    }
    if (document.selection) { // IE
      return {
        start: -1,
        end: -1
      }
    }
    if (typeof ctrl.selectionStart === 'number') {
      CaretPos.start = ctrl.selectionStart
    }
    if (typeof ctrl.selectionEnd === 'number') {
      CaretPos.end = ctrl.selectionEnd
    }
    return CaretPos
  }

  // 设置光标位置
  setCursorPosition = (ctrl, pos) => {
    ctrl.focus()
    ctrl.setSelectionRange(pos, pos) // 起始位置重合，未选中
  }


  // 选中emoji
  handleEmojiClick = (e, emojiObject) => {
    const { value } = this.state
    const { onInput } = this.props
    // console.log(emojiObject, value)
    const caretPos = this.getPositionForTextArea(this.textRef)
    let nextValue = ''
    let endPoint = value.length || 0
    if (caretPos.start < 0) {
      nextValue = `${value}${emojiObject.emoji}`
    } else {
      const preStr = value.substr(0, caretPos.start)
      const sufStr = value.substr(caretPos.start, value.length)
      // 每次增加一个表情后追加一个空格 防止连续输入表情导致表情失效（bug）
      nextValue = `${preStr}${emojiObject.emoji} ${sufStr}`
      // console.log(preStr, sufStr)
      endPoint = caretPos.start + 2
    }

    this.setState({
      visible: false,
      value: nextValue
    }, () => {
      this.setCursorPosition(this.textRef, endPoint)
    })
    // eslint-disable-next-line no-unused-expressions
    onInput && onInput()
  }

  operationEmjioClick = () => {
    const { visible } = this.state
    this.setState({
      visible: !visible
    })
  }

  handleChange = (e) => {
    const { onInput } = this.props
    this.setState({
      value: e.currentTarget.value
    })
    // eslint-disable-next-line no-unused-expressions
    onInput && onInput()
  }

  render() {
    const { visible, value } = this.state
    return (
      <div className="message-input-container">
        {/* <div className="top"></div> */}
        <div className="message-operation-container-line " />
        <div className="message-operation-container">
          <div className="message-operation-emjio" onClick={this.operationEmjioClick} />
          <div style={{ position: 'absolute', top: 4, transform: 'translateY(-100%)' }}>
            {visible && <Picker onEmojiClick={this.handleEmojiClick} />}
          </div>
        </div>
        <div className="message-input-textarea-container">
          <textarea
            className="message-input-textarea"
            value={value}
            maxLength={500}
            onChange={this.handleChange}
            ref={(ref) => { this.textRef = ref }}
          />
        </div>
        <div className="message-input-textarea-footer">
          <Button type="primary" onClick={this.handleSubmit}>发送</Button>
        </div>
      </div>
    )
  }
}

MessageInput.defaultProps = {
  onInput: () => {},
}
MessageInput.propTypes = {
  onInput: PropTypes.func,
}


export default MessageInput
