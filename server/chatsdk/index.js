/* eslint-disable class-methods-use-this */
// const server = require('http').createServer()

const constModel = require('./const')

const { CHAT_ACTION } = constModel

class ChatSDK {
  constructor() {
    this.io = null
    /**
     * {
     *  roomId: {
     *    socketid: socket
     *  }
     * }
     */
    this.rooms = {}
    /**
     * {
     *  socketid: {
     *    userid,
     *    socket,
     *    roomid
     *  }
     * }
     */
    this.clientList = {}
  }

  init(server, opts) {
    this.io = require('socket.io')(server, opts)
    this.bindConnection()
  }

  /**
   * 进入聊天室
   */
  enterRoom(roomId, socket) {
    if (!this.rooms[roomId]) {
      this.rooms[roomId] = {}
    }
    const socketId = socket.id
    this.rooms[roomId][socketId] = socket
  }

  /**
   * 判断是否在聊天室
   */
  isInRoom(roomId, socket) {
    if (this.rooms[roomId] && this.rooms[roomId][socket.id]) {
      return true
    }
    return false
  }

  /**
   * 离开聊天室
   */
  leaveRoom(socket) {
    if (!this.clientList[socket.id] || !this.clientList[socket.id].roomId) {
      return
    }
    const { roomId } = this.clientList[socket.id]
    if (roomId && this.rooms[roomId]) {
      this.rooms[roomId][socket.id] = null
    }
  }

  /**
   * 判断是否登录
   */
  isClientLogin(socket) {
    return this.clientList[socket.id] ? true : false
  }

  /**
   * 获取用户
   */
  getClient(socket) {
    return this.clientList[socket.id] ? this.clientList[socket.id] : null
  }

  /**
   * 添加一个用户
   */
  pushClient(userId, socket, roomId = '-1') {
    const client = {
      userId,
      socket,
      roomId
    }
    this.clientList[socket.id] = client
    return client
  }

  /**
   * 移除一个用户
   */
  removeClient(socket) {
    if (this.clientList[socket.id]) {
      this.clientList[socket.id] = null
    }
  }

  /**
   * 用户链接
   */
  bindConnection() {
    this.io.on('connection', (socket) => {
      console.log('some one connection socket id:', socket.id)
      this.bindLogin(socket)
      this.bindDisconnection(socket)
      this.bindJoinRoom(socket)
      this.bindChat(socket)
    })
  }

  /**
   * 断开用户链接
   */
  bindDisconnection(socket) {
    socket.on('disconnect', () => {
      console.log('some one disconnect socket id:', socket.id)
      this.leaveRoom(socket)
      this.removeClient(socket)
    })
  }

  // eslint-disable-next-line class-methods-use-this
  /**
   * 用户登录
   */
  bindLogin(socket) {
    socket.on('login', (data) => {
      console.log('socket id', socket.id, 'login :', data)
      const { userId } = data
      const client = this.pushClient(userId, socket)
      // 加入用户链接里及登录成功
      client.socket.emit('login', { status: 0 })
    })
  }

  /**
   * 加入房间
   */
  bindJoinRoom(socket) {
    socket.on('join', (data) => {
      const { roomId } = data
      if (this.isClientLogin(socket)) {
        console.log('join socket id', socket.id, 'room id', roomId)
        socket.join(roomId)

        // 进入房间
        const client = this.getClient(socket)
        this.pushClient(client.userId, socket, roomId)
        this.enterRoom(roomId, socket)

        // 发出动作
        socket.to(roomId).emit('chat', {
          userId: client.userId,
          roomId,
          action: CHAT_ACTION.CHAT_ACTION_JOIN
        })
      }
    })
  }

  // 'chat', {
  //   userId: client.userId,
  //   roomId,
  //   action: CHAT_ACTION.CHAT_ACTION_JOIN
  //   content: {}
  // }
  /**
   * 聊天
   */
  bindChat(socket) {
    socket.on('chat', (data) => {
      const { roomId, content } = data
      if (this.isClientLogin(socket) && this.isInRoom(roomId, socket)) {
        const client = this.clientList[socket.id]
        console.log('chat socket id', socket.id, 'chat', data)
        socket.to(roomId).emit('chat', {
          userId: roomId.userId,
          roomId,
          content,
          action: CHAT_ACTION.CHAT_ACTION_CHAT
        })
      }
    })
  }
}

const chatSDK = new ChatSDK()
// chatSDK.ChatSDK = ChatSDK
// const chatSDK = ChatSDK.getInstance()
// const chatSDK = 1
module.exports = {
  chatSDK
}
