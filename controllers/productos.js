const { request, response } = require("express");

const { Producto, Usuario, Categoria } = require("../models");
const usuario = require("../models/usuario");





const crearProducto = async( req = request , res = response ) => {

    const { estado , usuario , ...body  } = req.body;
    nombre = body.nombre

    // verificar si el producto no existe en la DB
    const productoDB = await Producto.findOne({nombre});
    
    console.log({nombre})
    if( productoDB ){
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        });
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,      
    }

    const producto = new Producto(data);

    await producto.save();
    
    res.json({producto});
}

const obtenerProducto = async ( req = request , res = response ) => {

    const { limite = 5 , desde = 0 } = req.query;

    const query = { estado: true };

    const [ total , productos ] = await Promise.all([
        Producto.count(query),
        Producto.find(query)
            .skip(desde)
            .limit(limite)
            .populate('usuario' , 'nombre' )
            .populate( 'categoria' , 'nombre' )
    ])

    res.json({ total , productos});
}

const obtenerProductoPorId = async ( req = request , res = response ) => {
    // debemos recibir el id desde la consulta
    const { id } = req.params;
    
    // buscamos el producto solicitado
    const producto = await Producto.findById( id )
                            .populate('usuario' , 'nombre' )
                            .populate( 'categoria' , 'nombre' );

    //console.log(producto)
    res.json(producto);
}

const actualizarProducto = async( req = request , res = response ) => {
    // Necesitamos identificar el producto a actualizar mediante el id
    const { id } = req.params;
    
    // Y debemos recibir los campos que vamos a actualizar del producto en cuestion, excluyendo de la data los que no quiero que puedan ser modificados
    const { usuario , estado , ...data } = req.body;
   
    if ( data.nombre){
    data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate( id , data , {new: true} );
    
    res.json(producto)
}

const borrarProducto = async( req = request , res = response) => {

    const { id } = req.params;
    
    
    const productoBorrada = await Producto.findByIdAndUpdate( id , {estado: false} , {new:true});


    res.json(productoBorrada);

}

module.exports={
    crearProducto,
    obtenerProducto,
    obtenerProductoPorId,
    actualizarProducto,
    borrarProducto
}