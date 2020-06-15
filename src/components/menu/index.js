import React from 'react'
import * as PropTypes from 'prop-types'
import { Menu } from 'antd'
// import {
//   SettingOutlined,
// } from '@ant-design/icons'
import { CHECK_STATUS } from '@consts'

const { Item, SubMenu } = Menu


export default function AppMenu({ menus = [], selectedKey, handleMenuClick, handleSubmenuClick }) {
  const renderMenu = (menu, isChild = false) => (
    menu.map(({ key, title, child, showPage }) => {
      if (child && child.length) {
        const subMenuTitle = (
          <span>
            {/* {React.createElement(MENU_ICONS[key] || SettingOutlined)} */}
            <span>{title}</span>
          </span>
        )
        return (
          <SubMenu
            key={key}
            title={subMenuTitle}
            onTitleClick={(+showPage === CHECK_STATUS.YES) ? handleSubmenuClick : () => {}}
          >
            {renderMenu(child, true)}
          </SubMenu>
        )
      }
      return (
        <Item key={key}>
          {/* {!isChild && (React.createElement(MENU_ICONS[key] || SettingOutlined))} */}
          <span>{title}</span>
        </Item>
      )
    })
  )

  return (
    <Menu
      theme="dark"
      // mode="vertical"
      style={{ lineHeight: '64px', flex: 1 }}
      defaultSelectedKeys={menus.length ? [menus[0].key] : []}
      selectedKeys={[selectedKey]}
      onClick={handleMenuClick}
    >
      {renderMenu(menus)}
    </Menu>
  )
}
AppMenu.defaultProps = {
  menus: [],
  selectedKey: '',
  handleMenuClick: () => {},
  handleSubmenuClick: () => {}
}

AppMenu.propTypes = {
  menus: PropTypes.arrayOf(PropTypes.any),
  selectedKey: PropTypes.string,
  handleMenuClick: PropTypes.func,
  handleSubmenuClick: PropTypes.func,
}
