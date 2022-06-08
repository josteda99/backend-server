const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");
const validarJWT = (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({ ok: false, msg: "no hay token" });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({ ok: false, msg: "token invalido" });
  }
};

const validarADMIN_ROLE = async (req, res, next) => {
  const uid = req.uid;
  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "usuario no existe",
      });
    }
    if (usuarioDB.role !== "ADMIN_ROLE") {
      return res.status(403).json({
        ok: false,
        msg: "no teine privilegios para hacerlo",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "hable con dmin",
    });
  }
};

const validarADMIN_ROLE_o_MismoUsuario = async (req, res, next) => {
  const uid = req.uid;
  const id = req.params.id;
  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "usuario no existe",
      });
    }
    if (usuarioDB.role === "ADMIN_ROLE" || uid === id) {
      next();
    } else {
      return res.status(403).json({
        ok: false,
        msg: "no teine privilegios para hacerlo",
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "hable con dmin",
    });
  }
};

module.exports = {
  validarJWT,
  validarADMIN_ROLE,
  validarADMIN_ROLE_o_MismoUsuario,
};
