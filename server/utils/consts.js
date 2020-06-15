const API_CLIENT_STATUS = {
  OK: 0,
  ERR: -1,
  ARG_ERROR: 1001,
}

const API_CLIENT_CODE = {
  OK: 200,
  ERR: 500,
}

// 角色枚举
const ROLE_ENUM = {
  ADMIN: 0,
  WAITER: 1,
  GUEST: 2
}

// 后台默认角色
const SYSTEM_ROLE = {
  ROOT: 1,
  WAITER: 2
}
// 每个在线客服最大分配用户数（同时服务）
const MAX_GUESTS_DISPATCHED = 10

// 临时消息最大储存量
const MAX_MSG_POOL_SIZE = 5

// 消息类型
const MSG_TYPE_ENUM = {
  TEXT: 1,
  IMAGE: 2,
  AUDIO: 3,
  VIDEO: 4,
  FILE: 5
}

// 角色权限大小（权限越大，功能越全）
const ROLE_PERMISSION_LEVEL = {
  DEFAULT: 0,
  GUEST: 1,
  WAITER: 2,
  ADMIN: 3
}

// 消息发送状态
const MSG_STATUS = {
  LOADING: 1, // 发送中
  OK: 2, // 发送成功
  ERR: 3 // 发送失败
}

// IO连接状态
const CONNECTED_CODE = {
  CONNECTED: 1,
  DISCONNECTED: 2,
  ERROR: 3,
  TIMEOUT: 4,
  BUSY: 5,
  EMPTY: 6,
}

module.exports = {
  API_CLIENT_STATUS,
  API_CLIENT_CODE,
  ROLE_ENUM,
  MAX_GUESTS_DISPATCHED,
  MSG_TYPE_ENUM,
  MAX_MSG_POOL_SIZE,
  ROLE_PERMISSION_LEVEL,
  MSG_STATUS,
  SYSTEM_ROLE,
  CONNECTED_CODE
}
