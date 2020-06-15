import React, { Component, useRef, useEffect } from 'react'
import * as PropTypes from 'prop-types'
import logger from '@utils/logger'
import { localStore } from '@stores/local'
import { getElemPos } from '@utils/tools'

const Measure = ({ onChange }) => {
  const dividerRef = useRef(null)
  useEffect(() => {
    const position = getElemPos(dividerRef.current)
    // 剩余可用高度
    const height = localStore.client.height - position.top
    // logger.log('measure', height, position)
    onChange(height, position)
  })

  return (
    <div ref={dividerRef} />
  )
}

Measure.propTypes = {
  onChange: PropTypes.func
}
Measure.defaultProps = {
  onChange: () => {}
}

export { Measure }
