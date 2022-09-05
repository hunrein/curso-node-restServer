const { response, request } = require("express");
const { Categoria } = require('../models');


/* TAREA */
// obtenerCategorias - paginado - total - populate 
const obtenerCategorias = async( req = request, res = response ) =>{

    const { limite = 5 , desde = 0 } = req.query;
    const query = { estado: true}

    const [ total , categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip(desde)
            .limit(limite)
            .populate('usuario', 'nombre')
    ])
   
    res.status(200).json( {total , categorias} );    
}

// obtenerCategoria - populate - { }

const obtenerCategoria = async ( req = request , res = response ) =>{
    
    const {id} = req.params; // desestructuramos de los params el id
    console.log(id);
    
    const categoria = await Categoria.findById(id).populate( 'usuario' , 'nombre') // buscamos una categoria con el id ingresado

        // si no existe la categoría, devolvemos el error
        // esto lo hice en los helpers/db-validators
    
        // si existe enviamos la categoria
    res.json(categoria)

    
    
}


const crearCategoria = async( req , res = response) =>{

    // Recibimos la categoría que el ususario desea crear
    // Esta es enviada a través de una petición post en el body y la almacenamos en upperCase
    const nombre = req.body.nombre.toUpperCase();

    // Consultamos en la DB si existe una categoría con el mismo nombre
    const categoriaDB =  await Categoria.findOne({nombre});

    // Si existe, lanzamos el siguiente error
    if( categoriaDB ){
        return res.status(400).json({
            msg: `La categoría ${categoriaDB.nombre} ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    console.log(data);

    // Se crea la nueva categoria usando el modelo
    const categoria = new Categoria( data );

    // Guardar DB
    await categoria.save();

    res.status(201).json(categoria);
}

// actualizarCategoria
// debe recibir el nombre y cambiarlo
const actualizarCategoria = async(req = request , res = response) => {

    const { id } = req.params;
    const { estado , usuario , ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;


    const categoria = await Categoria.findByIdAndUpdate( id , data , {new: true});
    //console.log(id , data)
    res.json(categoria);

}

// borrar categoria - estado: false

const borrarCategoria = async( req = request , res = response) => {

    const { id } = req.params;
    
    
    const categoriaBorrada = await Categoria.findByIdAndUpdate( id , {estado: false} , {new:true});


    res.json(categoriaBorrada);

}


module.exports= {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}