const { Router } = require('express');
const { check } = require('express-validator'); // es una gran colección de middlewares, tiene una gran cantidad de validaciones que podemos ejecutar antes de llamar nuestra función o ruta
const { validarCampos } = require('../middlewares/validar-campos');

const { login, googleSignIn } = require('../controllers/auth');



const router = Router();

router.post( '/login' , [
    check('correo' , 'El correo es obligatorio').isEmail(),
    check('password' , 'El password es obligatorio').not().isEmpty(),
    validarCampos
] , login );

router.post( '/google' , [
    check('id_token' , 'id_token es necesario').not().isEmpty(),
    
    validarCampos
] , googleSignIn );


module.exports = router;