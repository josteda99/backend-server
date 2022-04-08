const express = require('express')
require('dotenv').config()
const { dbConnection } = require('./database/config')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
dbConnection()
//rutas

app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/login', require('./routes/auth'))

app.listen(process.env.PORT, () => {
  console.log('servido corriendo en el pierto ', process.env.PORT)
})
