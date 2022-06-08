/* 
  ruta : /api/medicos
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const {
  getMedicos,
  crearMedicos,
  actualizarMedicos,
  borrarMedicos,
} = require('../controllers/medicos')
const router = Router()

router.get('/', getMedicos)
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'el nombre del medico es necesario').not().isEmpty(),
    check('hospital', 'el hospital es necesario').isMongoId(),
    validarCampos,
  ],
  crearMedicos,
)
router.put('/:id', validarJWT,
  [
    validarJWT,
    check('nombre', 'el nombre del medico es necesario').not().isEmpty(),
    check('hospital', 'el hospital es necesario').isMongoId(),
    validarCampos,
  ]
  , actualizarMedicos)
router.delete('/:id', [
  validarJWT,
  check('nombre', 'el nombre del medico es necesario').not().isEmpty(),
  check('hospital', 'el hospital es necesario').isMongoId(),
  validarCampos,
], borrarMedicos)

module.exports = router
