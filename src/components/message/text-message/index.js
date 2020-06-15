import React, { Component } from 'react'
import logger from '@utils/logger'
import './index.css'
import BaseMessage from '../base'

class TextMessage extends Component {
  componentDidMount() {

  }

  render() {
    const { isLeft, avatarUrl, content } = this.props
    return (
      <BaseMessage isLeft={isLeft} avatarUrl={avatarUrl}>
        {content}
      </BaseMessage>
    )
  }
}

export default TextMessage
