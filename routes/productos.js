const {Router} = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProducto, obtenerProductoPorId, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeProductoPorId, existeCategoríaPorId } = require('../helpers/db-validators');
const { validarJWT, esAdminRole, validarCampos } = require('../middlewares');



const router = Router();

// Crear un nuevo producto - 
router.post('/', [
    validarJWT,
    esAdminRole,
    check('nombre' , 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoríaPorId),
    validarCampos,
],crearProducto);

// Obtener productos - paginado - público

router.get('/', obtenerProducto);

// Obtener productos por ID

router.get( '/:id' , [
    check( 'id' , 'No es un id válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
] , obtenerProductoPorId);

router.put('/:id' , [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
] , actualizarProducto);

router.delete('/:id' , [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
] ,borrarProducto );




module.exports = router;