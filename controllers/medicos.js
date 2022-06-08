const { response } = require('express')
const medico = require('../models/medico')
const Medico = require('../models/medico')

const getMedicos = async (req, res = response) => {
  const medicos = await Medico.find().populate('medico', 'nombre')
  res.json({
    ok: true,
    medicos: medicos,
  })
}

const crearMedicos = async (req, res = response) => {
  const hid = req.hid
  const uid = req.uid
  const medico = new Medico({ medico: hid, usuario: uid, ...req.body })

  try {
    const medicoDB = await medico.save()
    res.json({
      ok: true,
      medico: medicoDB,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'hable con el admin',
    })
  }
}

const actualizarMedicos = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    const medico = await Medico.findById(id);
    if (!medico) {
      return res.status(404).json({
        ok: false,
        msg: 'medico no encontrado',
      })
    }

    const cambiosMedico = {
      ...req.body,
      usuario: uid
    }
    const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });
    res.json({
      ok: true,
      medicoActualizado,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'hable con el admin',
    })
  }
}

const borrarMedicos = async (req, res = response) => {
  const id = req.params.id;
  try {
    const medico = await Medico.findById(id);
    if (!medico) {
      return res.status(404).json({
        ok: false,
        msg: 'medico no encontrado',
      })
    }

    await Medico.findByIdAndDelete(id)
    res.json({
      ok: true,
      msg: "medico eliminado",
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'hable con el admin',
    })
  }
}

module.exports = {
  getMedicos,
  crearMedicos,
  actualizarMedicos,
  borrarMedicos,
}
