const mongoose = require("mongoose");
const { Categoria , Producto} = require('../models');
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

// Valida si existe una categoria en la DB
const existeCategoríaPorId = async( id )=>{


    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No es un id de Mongo válido`);
    }


    const existeCategoria = await Categoria.findById( id );
    if( !existeCategoria ){
        throw new Error(`La categoría no existe`)
    }
}

const existeProductoPorId = async( id )=>{


    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No es un id de Mongo válido`);
    }


    const existeProducto = await Producto.findById( id );
    if( !existeProducto ){
        throw new Error(`El Producto no existe`)
    }
}


module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoríaPorId,
    existeProductoPorId
}












