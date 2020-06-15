import React, { Component } from 'react'
import logger from '@utils/logger'
import './index.css'
import { Layout, List } from 'antd'
import TextMessage from '@components/message/text-message'
import MessageInput from '@components/message-input'
import {
  Provider,
  KeepAlive,
} from 'react-keep-alive'

const { Sider, Content } = Layout

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.'
]
class CustomChat extends Component {
  constructor(props) {
    super(props)
    let chatHeight = 0
    let chatWidth = 0
    const size = this.getChatSize()
    chatHeight = size.height
    chatWidth = size.width
    this.state = { chatHeight, chatWidth }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this))
  }

  getChatSize = () => {
    let chatHeight = 0
    let chatWidth = 0
    if (window.innerWidth) {
      chatWidth = window.innerWidth
    } else if ((document.body) && (document.body.clientWidth)) {
      chatWidth = document.body.clientWidth
    }
    chatWidth -= 400
    if (window.innerHeight) {
      chatHeight = window.innerHeight
    } else if ((document.body) && (document.body.clientHeight)) {
      chatHeight = document.body.clientHeight
    }
    chatHeight -= 50
    return {
      height: chatHeight,
      width: chatWidth
    }
  }

  handleResize(e) {
    const size = this.getChatSize()
    console.log(size)
    this.setState({
      chatHeight: size.height,
      chatWidth: size.width
    })
  }

  render() {
    const { chatHeight, chatWidth } = this.state
    const isLeft = false
    return (
      <Layout>
        <div className="chat-container">
          <div className="user-list" style={{ height: `${chatHeight}px` }}>
            <KeepAlive name="cutom-user-list">
              <List
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    {item}
                  </List.Item>
                )}
              />
            </KeepAlive>
          </div>
          <div className="custom-container" style={{ width: `${chatWidth}px`, height: `${chatHeight}px` }}>
            <KeepAlive name="cutom-user-chat-window">
              <div className="chat-winow">
                <TextMessage isLeft content="sadads" />
                <TextMessage isLeft={isLeft} content="sadads" />
              </div>
            </KeepAlive>
            <div className="chat-input">
              <KeepAlive name="cutom-user-chat">
                <MessageInput />
              </KeepAlive>
            </div>

          </div>
        </div>
      </Layout>
    )
  }
}

export default CustomChat
