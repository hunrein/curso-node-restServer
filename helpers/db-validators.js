
const Role = require('../models/role');
const Usuario = require('../models/usuario');

// Valida si el rol asignado es un rol válido en el programa
const esRolValido = async (rol = '') =>{
        const existeRol = await Role.findOne({rol});
        if ( !existeRol ){
            throw new Error(`El rol ${ rol } no está registrado en la base de datos`)
        }
    }
// Valida si el correo ya está registrado por algún usuario
const emailExiste = async( correo = '' )=>{
    const existeEmail = await Usuario.findOne({correo});
    if( existeEmail){
        throw new Error(`El correo ${correo} ya está registrado`)
}}

// Valida si existe un usuario con el id especificado
const existeUsuarioPorId = async( id  )=>{
    const existeUsuario = await Usuario.findById( id );
    if( !existeUsuario){
        throw new Error(`El id ${id} no existe`)
}}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
}












