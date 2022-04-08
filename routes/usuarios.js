/* 
  ruta : /api/usuarios
*/

const { Router } = require('express')
const { check } = require('express-validator')
const {
  getUsuarios,
  crearUsuarios,
  actualizarUsuario,
  borrarUsuario,
} = require('../controllers/usuarios')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()

router.get('/', validarJWT, getUsuarios)
router.post(
  '/',
  [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'la constraseña es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    validarCampos,
  ],
  crearUsuarios,
)
router.put(
  '/:id',
  [
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    check('role', 'el role es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuario,
)
router.delete('/:id', validarJWT, borrarUsuario)

module.exports = router