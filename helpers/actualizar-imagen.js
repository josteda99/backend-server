const Usuario = require('../models/usuario')
const Medico = require('../models/medico')
const Hospital = require('../models/hospital')
const fs = require('fs')

const borrarImagen = (path) => {
  if (fs.existsSync(pathViejo)) {
    //borrar la imgaen anterior
    fs.unlinkSync(pathViejo)
  }
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {
  switch (tipo) {
    case 'medicos':
      const medico = await Medico.findById(id)
      if (!medico) {
        console.log('no se encontro')
        return false
      }
      const pathViejo = `./uploads/medicos/${medico.img}`
      borrarImagen(pathViejo)
      medico.img = nombreArchivo
      await medico.save()
      return true
    case 'hospitales':
      const hospital = await Hospital.findById(id)
      if (!hospital) {
        console.log('no se encontro')
        return false
      }
      const pathViejo2 = `./uploads/hospitales/${hospital.img}`
      borrarImagen(pathViejo2)
      hospital.img = nombreArchivo
      await hospital.save()
      return true
    case 'usuarios':
      const usuario = await Usuario.findById(id)
      if (!usuario) {
        console.log('no se encontro')
        return false
      }
      const pathViejo3 = `./uploads/usuarios/${usuario.img}`
      borrarImagen(pathViejo3)
      usuario.img = nombreArchivo
      await usuario.save()
      return true
  }
}

module.exports = { actualizarImagen }

// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/uploads'));
