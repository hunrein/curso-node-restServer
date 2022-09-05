const { Router } = require('express');
const { check } = require('express-validator'); // es una gran colección de middlewares, tiene una gran cantidad de validaciones que podemos ejecutar antes de llamar nuestra función o ruta
const { crearCategoria, 
        obtenerCategorias, 
        obtenerCategoria, 
        actualizarCategoria, 
        borrarCategoria } = require('../controllers/categorias');
const {  existeCategoríaPorId } = require('../helpers/db-validators');
const { validarCampos , validarJWT, esAdminRole } = require('../middlewares');




const router = Router();

/* 
{{url}}/api/categorias
*/

// Obtener todas las categorías - público
router.get('/' , obtenerCategorias );

// Obtener categoría por id - publico
router.get('/:id' , [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoríaPorId ),
    validarCampos
] ,obtenerCategoria );

// Crear una nueva categoría - privado - Cualquier persona con un token válido
router.post('/' , [ 
    validarJWT ,
    check('nombre' , 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
] , crearCategoria);

// Actualizar un registro - privado - cualquiera con token válido
router.put('/:id' , [
    validarJWT,
    check('nombre' , 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoríaPorId ),
    validarCampos
] , actualizarCategoria );

// Borrar una catgegoría - Adimin
router.delete('/:id' , [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoríaPorId ),
    validarCampos
] ,borrarCategoria );

module.exports = router;