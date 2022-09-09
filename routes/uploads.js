const { Router } = require('express');
const { check } = require('express-validator'); // es una gran colección de middlewares, tiene una gran cantidad de validaciones que podemos ejecutar antes de llamar nuestra función o ruta
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarArchivoSubir , validarCampos } = require('../middlewares');





const router = Router();

router.post( '/' , [
    validarArchivoSubir,
    validarCampos
] , cargarArchivo)


router.put('/:coleccion/:id' , [ 
    validarArchivoSubir,
    check( 'id' , 'El id debe ser un Mongo Id').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c , [ 'usuarios' , 'productos'] ) ),
    validarCampos
] , actualizarImagenCloudinary )

router.get('/:coleccion/:id', [
    check( 'id' , 'El id debe ser un Mongo Id').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c , [ 'usuarios' , 'productos'] ) ),
    validarCampos
], mostrarImagen )

module.exports = router;