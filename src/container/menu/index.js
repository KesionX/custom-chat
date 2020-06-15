import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import { wrapPath } from '@utils/tools'
import Menu from '@components/menu'


class AppMenu extends Component {
  // 处理没有子菜单的菜单项点击事件
  handleMenuClick = ({ key }) => {
    const { history } = this.props
    if (key === 'service') {
      window.location.href = wrapPath('service')
      return
    }
    history.push(wrapPath(key))
  }

  // 处理含子菜单的菜单项点击事件
  handleSubmenuClick = ({ key }) => {
    const { history } = this.props
    history.push(wrapPath(key))
  }

  render() {
    // const { [UI_KEY]: uiStore } = this.props
    const { menus } = this.props
    return (
      <Menu
        menus={menus}
        // selectedKey={selectedKey}
        handleMenuClick={this.handleMenuClick}
        handleSubmenuClick={this.handleSubmenuClick}
      />
    )
  }
}

export default AppMenu
