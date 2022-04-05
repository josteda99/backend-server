const express = require('express')
require('dotenv').config()
const {
  dbConnection
} = require('./database/config')
const cors = require('cors')


const app = express();
app.use(cors())
dbConnection();
//rutas
app.get('/', (req, res) => {
  res.json({
    ok: true,
    msg: 'hola mundo'
  })
})

app.listen(process.env.PORT, () => {
  console.log('servido corriendo en el pierto ', process.env.PORT)
})