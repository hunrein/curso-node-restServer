
const { Router } = require('express');
const { check } = require('express-validator'); // es una gran colección de middlewares, tiene una gran cantidad de validaciones que podemos ejecutar antes de llamar nuestra función o ruta


const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido , emailExiste , existeUsuarioPorId} = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPatch,
        usuariosDelete,
        usuariosPost,
        usuariosPut } = require('../controllers/usuarios');



const router = Router();

router.get('/', usuariosGet )

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(), // express validator tiene una función específica para validar id de Mongo
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRolValido ),
    validarCampos
] ,usuariosPut)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), // chequea que no esté vacío
    check('password', 'El password debe ser de más de 6 letras').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(), // chequea que sea un emali
    check('correo').custom( emailExiste ),
    // check('rol' , 'No es un rol permitido').isIn(['ADMIN_ROLE' , 'USER_ROLE']),
    //ver usuariosPost en folder controllers/usuarios.js
    check('rol').custom( esRolValido ),
    validarCampos,
] ,usuariosPost)

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete)

router.patch('/' , usuariosPatch)

module.exports = router;

