const { response } = require("express");
const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { googleVerify } = require("../helpers/google-helper");
const { getMenuFrontEnd } = require("../helpers/menu-frontend");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      res.status(404).json({
        ok: false,
        msg: "email no encontrada",
      });
    }

    const validPassword = bcrypt.compareSync(password, usuarioDB.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña no avalid",
      });
    }
    //generar JWT
    const token = await generarJWT(usuarioDB.id);
    res.json({
      ok: true,
      token,
      menu: getMenuFrontEnd(usuarioDB.role),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, revisar logs",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const googleToken = req.body.token;
  try {
    const { name, email, picture } = await googleVerify(googleToken);
    const usuarioDB = await Usuario.findOne({ email });
    let usuario;
    if (!usuarioDB) {
      usuario = new Usuario({
        nombre: name,
        email: email,
        password: "@",
        img: picture,
        google: true,
      });
    } else {
      usuario = usuarioDB;
      usuario.google = true;
      usuario.password = "@";
    }

    await usuario.save();

    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      token,
      menu: getMenuFrontEnd(usuarioDB.role),
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "token incorrecto",
    });
  }
};

const renrewToken = async (req, res = response) => {
  const uid = req.uid;
  const token = await generarJWT(uid);
  const usuario = await Usuario.findById(uid);
  res.json({
    ok: true,
    token,
    usuario,
    menu: getMenuFrontEnd(usuario.rol),
  });
};

module.exports = {
  login,
  googleSignIn,
  renrewToken,
};
