const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const AuthRouter = require('./routes/AuthRouter')
const SketchRouter = require('./routes/SketchRouter')
const FriendRouter = require('./routes/FriendRouter')
const { init, getIO } = require('./utils/socket')

const app = express()
const http = require('http')
const server = http.createServer(app)

const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(logger('dev'))
app.use(express.json({ limit: '200MB' }))
init(server)

app.use('/auth', AuthRouter)
app.use('/sketches', SketchRouter)
app.use('/friends', FriendRouter)

// socket stuff

getIO().on('connection', (socket) => {
  console.log(`User ${socket.id} connected!`)

  socket.on('send_message', (data) => {
    console.log(data)
    // console.log(`${userId} sent you a message!`)
  })
})

server.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`))
