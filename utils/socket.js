const { Server } = require('socket.io')
let io

const init = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
  })
}

const getIO = () => {
  if (!io) {
    console.log('IO not initialized :(')
  } else {
    return io
  }
}

module.exports = { init, getIO }
