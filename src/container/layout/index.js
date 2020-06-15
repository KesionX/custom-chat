import React, { Component, Fragment } from 'react'
import * as PropTypes from 'prop-types'
import Footer from '@components/footer'
import Header from '@components/header'
import { MENUS } from '@consts'
import { Layout } from 'antd'
import AppMenu from '../menu'
import './index.css'

const { Sider, Content } = Layout

class MLayout extends Component {
  componentDidMount() {

  }

  render() {
    const { children, menus, history, title } = this.props
    return (
      <Fragment>
        <Layout>
          <Sider>
            <AppMenu menus={menus} history={history} />
          </Sider>
          <Layout style={{ minHeight: '100vh' }}>
            <Header title={title} />
            <Content className="app-body">{children}</Content>
            {/* <Footer /> */}
          </Layout>
        </Layout>
      </Fragment>
    )
  }
}

export default MLayout
