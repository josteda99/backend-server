/* 
  ruta : /api/usuarios
*/

const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsuarios,
  crearUsuarios,
  actualizarUsuario,
  borrarUsuario,
} = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  validarJWT,
  validarADMIN_ROLE,
  validarADMIN_ROLE_o_MismoUsuario,
} = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, getUsuarios);
router.post(
  "/",
  [
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("password", "la constraseña es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    validarCampos,
  ],
  crearUsuarios
);
router.put(
  "/:id",
  [
    validarJWT,
    validarADMIN_ROLE_o_MismoUsuario,
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    check("role", "el role es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuario
);
validarADMIN_ROLE,
  router.delete("/:id", [validarJWT, validarADMIN_ROLE], borrarUsuario);

module.exports = router;
