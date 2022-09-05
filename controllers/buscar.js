const { request, response } = require("express");
const { isValidObjectId } = require("mongoose");

const { Usuario , Categoria , Producto } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuarios = async( termino = '' , res = response ) => {

    const esMongoId = isValidObjectId( termino ); // valida si es id de Mongo

    //Búsqueda por id de Mongo
    if( esMongoId ){
        const usuario = await Usuario.findById( termino );
        return res.json({
            results: ( usuario ) ? [ usuario ] : [] // ternario, si existe usuario lo retorna, sino retorna array vacío
        })
    }

    // Búsqueda por nombre o email
    const regex = new RegExp( termino , 'i' ); // expresion regular para "key insensitive"

    const usuarios = await Usuario.find( { 
        $or:[ {nombre: regex} , { correo: regex } ], // busqueda por nombre o correo
        $and: [ { estado: true } ] // y además solo usuarios con estado en true
     });

    res.json({
        results: usuarios
    })
}

const buscarCategorias = async( termino , res = response ) => {

    const esMongoId = isValidObjectId( termino );

    if( esMongoId ){
        const categoria = await Categoria.findById( termino );
        return res.json({
            results: ( categoria ) ? [ categoria ] : [] 
        })
    }

    const regex = new RegExp( termino , 'i' );

    const categorias = await Categoria.find( { nombre: regex , estado: true })

    res.json({
        results: categorias
    })

}

const buscarProductos = async( termino , res = response ) => {

    const esMongoId = isValidObjectId( termino );

    if( esMongoId ){
        const producto = await Producto.findById( termino ).populate( 'categoria' , 'nombre' );
        return res.json({
            results: ( producto ) ? [ producto ] : [] 
        })
    }

    const regex = new RegExp( termino , 'i' );

    const productos = await Producto.find( { nombre: regex, estado: true }).populate( 'categoria' , 'nombre' );

    res.json({
        results: productos
    })

}

const buscar = ( req = request , res = response ) => {

    const { coleccion , termino } = req.params;

    if( !coleccionesPermitidas.includes( coleccion ) ){
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${ coleccionesPermitidas }`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios( termino , res );
        break;
    
        case 'categorias':
            buscarCategorias( termino , res );
        break;

        case 'productos':
            buscarProductos( termino , res );
        break;


        default:
            res.status(500).json({
                msg:'Se le olvidó hacer esta búsqueda'
            })
            break;
    }

}

module.exports = {
    buscar
}
