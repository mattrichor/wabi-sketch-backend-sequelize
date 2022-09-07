const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const AuthRouter = require('./routes/AuthRouter')
const SketchRouter = require('./routes/SketchRouter')

const app = express()

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(logger('dev'))
app.use(express.json({ limit: '200MB' }))

app.use('/auth', AuthRouter)
app.use('/sketches', SketchRouter)

app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`))
