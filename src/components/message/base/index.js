import React, { Component } from 'react'
import logger from '@utils/logger'
import './index.css'

class BaseMessage extends Component {
  componentDidMount() {

  }

  render() {
    const { isLeft, avatarUrl, children } = this.props

    const leftMessage = (
      <div className="base-left-message-container">
        <div className="left-avatar-container">
          <img className="avatar-image" src={avatarUrl} alt="" />
        </div>
        <div className="left-content">
          <div className="left-bubble">
            {children}
          </div>
        </div>
      </div>
    )

    const rightMessage = (
      <div className="base-right-message-container">
        <div className="right-avatar-container">
          <img className="avatar-image" src={avatarUrl} alt="" />
        </div>
        <div className="right-content">
          <div className="right-bubble">
            {children}
          </div>
        </div>
      </div>
    )
    let message
    if (isLeft) {
      message = leftMessage
    } else {
      message = rightMessage
    }
    return message
  }
}

export default BaseMessage
