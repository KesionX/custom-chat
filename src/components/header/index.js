import React, { Component } from 'react'
import logger from '@utils/logger'
import './index.css'

class Header extends Component {
  componentDidMount() {

  }

  render() {
    const { title } = this.props
    return (
      <div className="app-header">
        {title}
      </div>
    )
  }
}


export default Header
