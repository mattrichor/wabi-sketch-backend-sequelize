const express = require('express')
const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200
}
const logger = require('morgan')
const AuthRouter = require('./routes/AuthRouter')
const SketchRouter = require('./routes/SketchRouter')
const FriendRouter = require('./routes/FriendRouter')
const NotifRouter = require('./routes/NotifRouter')
const PromptRouter = require('./routes/PromptRouter')

const { init, getIO } = require('./utils/socket')

const app = express()
const http = require('http')
const server = http.createServer(app)

const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(logger('dev'))
app.use(express.json({ limit: '200MB' }))
init(server)

app.use('/auth', AuthRouter)
app.use('/sketches', SketchRouter)
app.use('/friends', FriendRouter)
app.use('/notifs', NotifRouter)
app.use('/prompts', PromptRouter)

// socket stuff

getIO().on('connection', (socket) => {
  console.log(`User ${socket.id} connected!`)

  socket.on('send_sketch', (data) => {
    console.log(data)
    socket.to(data.sketchRecip).emit('receive_notification', data)
  })
  socket.on('send_chat', (data) => {
    console.log(data)
    socket.broadcast.emit('receive_chat', data)
  })
  socket.on('create_room', (userId) => {
    socket.join(userId)
    console.log(`user joined room with id of ${userId}`)
  })
  socket.on('create_prompt_room', (promptId, userId) => {
    socket.join(promptId)
    console.log(`user ${userId} joined room ${promptId}`)
  })
})

server.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`))

// require('dotenv').config()
// module.exports = {
//   development: {
//     database: 'wabi_sketch_dev',
//     dialect: 'postgres'
//   },
//   test: {
//     database: 'wabi_sketch_test',
//     dialect: 'postgres'
//   },
//   production: {
//     use_env_variable: 'DATABASE_URL',
//     dialect: 'postgres',
//     dialectOptions: {
//       ssl: {
//         rejectUnauthorized: false,
//         require: true
//       }
//     }
//   }
// }
