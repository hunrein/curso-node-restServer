const { Router } = require('express');
const { check } = require('express-validator'); // es una gran colección de middlewares, tiene una gran cantidad de validaciones que podemos ejecutar antes de llamar nuestra función o ruta
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');




const router = Router();

router.post( '/login' , [
    check('correo' , 'El correo es obligatorio').isEmail(),
    check('password' , 'El password es obligatorio').not().isEmpty(),
    validarCampos
] , login );


module.exports = router;