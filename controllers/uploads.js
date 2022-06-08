const path = require('path')
const fs = require('fs')
const { response } = require('express')
const { v4: uuidv4 } = require('uuid')
const { actualizarImagen } = require('../helpers/actualizar-imagen')

const fileUpload = (req, res = response) => {
  const tipo = req.params.tipo
  const id = req.params.id

  const tiposValidos = ['hospitales', 'medicos', 'usuarios']
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: 'no es un medico o ussuario o hostpital',
    })
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: 'no hay ninugn archivo',
    })
  }

  const file = req.files.imagen
  const nombreCortado = file.name.split('.')
  const extensionArchivo = nombreCortado[nombreCortado.length - 1]
  const extensionValida = ['png', 'jpg', 'jpeg', 'gif']

  if (!extensionValida.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: 'no es una extension permitida',
    })
  }

  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`

  const path = `./uploads/${tipo}/${nombreArchivo}`

  // Use the mv() method to place the file somewhere on your server
  file.mv(path, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        msg: 'error en el servidor',
      })
    }
    actualizarImagen(tipo, id, nombreArchivo)
    res.json({
      ok: true,
      msg: 'archivo subido',
      nombreArchivo,
    })
  })
}

const retornaImagen = (req, res = response) => {
  const tipo = req.params.tipo
  const foto = req.params.foto
  const pathImg = path.join(__dirname, `..upliad/${tipo}/${foto}`)
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg)
  } else {
    res.status(200)
  }
}

module.exports = {
  fileUpload,
  retornaImagen,
}
