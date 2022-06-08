const { response } = require('express')
const Hospital = require('../models/hospital')

const getHospitales = async (req, res = response) => {
  const hospitales = await Hospital.find().populate('usuario', 'nombre img')
  res.json({
    ok: true,
    hospitales: hospitales,
  })
}

const crearHospitales = async (req, res = response) => {
  const uid = req.uid
  const hospital = new Hospital({ usuario: uid, ...req.body })
  try {
    const hospitalDB = await hospital.save()
    res.json({
      ok: true,
      hospital: hospitalDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'hable con el admin',
    })
  }
}

const actualizarHospitales = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: 'hospital no encontrado',
      })
    }

    const cambiosHospital = {
      ...req.body,
      usuario: uid
    }
    const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });
    res.json({
      ok: true,
      hospitalActualizado,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'hable con el admin',
    })
  }
}

const borrarHospitales = async (req, res = response) => {
  const id = req.params.id;
  try {
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: 'hospital no encontrado',
      })
    }

    await Hospital.findByIdAndDelete(id)
    res.json({
      ok: true,
      msg: "hospitaleliminado",
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
  getHospitales,
  crearHospitales,
  actualizarHospitales,
  borrarHospitales,
}
