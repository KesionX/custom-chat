import React, { useEffect } from 'react'

export default function NotFound() {
  useEffect(() => {
    document.title = '页面未找到'
  }, [])

  return (
    <div className="container">页面未找到</div>
  )
}
