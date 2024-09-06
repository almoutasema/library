const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3001
app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

const bookRouter = require('./routes/bookRoutes')
app.use('/bookRoutes', bookRouter)

app.listen(PORT, () => {
    console.log('API - Listening on port*:' + PORT)
})
