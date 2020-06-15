import React, { useState, useEffect } from 'react'
import * as PropTypes from 'prop-types'
import './index.css'

const Mask = ({ children, visible, onChange, transparent }) => {
  const [hide, setHide] = useState(false)
  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onChange.call(null, !visible, e)
  }

  // 首次加载
  useEffect(() => {
    if (!visible) {
      setHide(true)
    }
  }, [])

  const handleTranEnd = () => {
    if (!visible) {
      setHide(true)
    }
  }

  return (
    <div
      // eslint-disable-next-line no-nested-ternary
      className={`${transparent ? 'mask-transparent ' : ' '}${visible ? 'mask-show ' : (hide ? 'mask-none ' : 'mask-hide ')} mask `}
      onTouchEnd={handleClick}
      onTransitionEnd={handleTranEnd}
    >
      {children}
    </div>
  )
}

Mask.defaultProps = {
  onChange: () => {},
  transparent: false
}
Mask.propTypes = {
  children: PropTypes.element.isRequired,
  visible: PropTypes.bool.isRequired,
  transparent: PropTypes.bool,
  onChange: PropTypes.func
}
export { Mask }
