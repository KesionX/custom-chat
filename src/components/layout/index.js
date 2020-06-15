import React, { Fragment } from 'react'
import * as PropTypes from 'prop-types'
import Footer from '@components/footer'
import Header from '@components/header'
import AppMenu from '@components/menu'
import { MENUS } from '@consts'
import './index.css'
import { Layout } from 'antd'

const { Sider, Content } = Layout

export default function MLayout({ children }) {
  return (
    <Fragment>
      <Layout>
        <Sider>
          <AppMenu menus={MENUS} />
        </Sider>
        <Layout style={{ minHeight: '100vh' }}>
          <Header />
          <Content className="app-body">{children}</Content>
          <Footer />
        </Layout>
      </Layout>
    </Fragment>
  )
}

MLayout.propTypes = {
  children: PropTypes.element
}
MLayout.defaultProps = {
  children: null
}
