const { Router } = require('express');
const { check } = require('express-validator'); // es una gran colección de middlewares, tiene una gran cantidad de validaciones que podemos ejecutar antes de llamar nuestra función o ruta
const { cargarArchivo } = require('../controllers/uploads');
const { validarCampos } = require('../middlewares/validar-campos');




const router = Router();

router.post( '/' , [
    
] , cargarArchivo)


module.exports = router;