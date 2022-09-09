const path = require('path');
const  fs  = require('fs');

const cloudinary = require('cloudinary').v2; // Importamos el paquete de cludinary
cloudinary.config( process.env.CLOUDINARY_URL); // Configuramos nuestra autenticación en claudinary utilizando nuestra variable de entorno


const { request, response } = require("express");

const { subirArchivo } = require("../helpers");

const { Producto, Usuario } = require('../models');




const cargarArchivo = async( req = request , res = response ) => {
      
    try {
        // txt
        const nombre = await subirArchivo(req.files , undefined , 'imgs' )

        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({
            msg
        })
    }
    
}

const actualizarImagen = async( req = request , res = response ) => {

    const { id , coleccion  } = req.params;

    let modelo;

    switch(coleccion){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                })
            }
            break;

            case 'productos':
                modelo = await Producto.findById(id);
                if(!modelo){
                    return res.status(400).json({
                        msg: `No existe un producto con el id ${ id }`
                    })
                }
                break;
        
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto'})
    }

    // Limpiar imágenes previas
    
    if( modelo.img){ // con esta condición verificamos si existe el path en nuestra base de datos, lo que no significa que verifique que la imagen exista en el servidor
    
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion , modelo.img );
        console.log(pathImagen)
        if( fs.existsSync( pathImagen ) ){
            fs.unlinkSync( pathImagen );
        }
    }


    const nombre = await subirArchivo(req.files , undefined , coleccion );
    modelo.img = nombre;

    await modelo.save();

    res.json(modelo);
}

const mostrarImagen = async( req = request , res = response  ) => {

    const { id , coleccion  } = req.params;

    let modelo;

    switch(coleccion){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                })
            }
            break;

            case 'productos':
                modelo = await Producto.findById(id);
                if(!modelo){
                    return res.status(400).json({
                        msg: `No existe un producto con el id ${ id }`
                    })
                }
                break;
        
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto'})
    }

    // Limpiar imágenes previas
    
    if( modelo.img){ // con esta condición verificamos si existe el path en nuestra base de datos, lo que no significa que verifique que la imagen exista en el servidor
    
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion , modelo.img );
        console.log(pathImagen)
        if( fs.existsSync( pathImagen ) ){
           return res.sendFile(pathImagen)
        }
    }

    const pathNoImage = path.join( __dirname , '../assets/no-image.jpg')
    return res.sendFile(pathNoImage);
    
    //res.json({ msg: 'Falta el placeholder'})
   
}

const actualizarImagenCloudinary = async( req = request , res = response ) => {

    const { id , coleccion  } = req.params;

    let modelo;

    switch(coleccion){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                })
            }
            break;

            case 'productos':
                modelo = await Producto.findById(id);
                if(!modelo){
                    return res.status(400).json({
                        msg: `No existe un producto con el id ${ id }`
                    })
                }
                break;
        
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto'})
    }

    // Limpiar imágenes previas
    
    if( modelo.img){ // con esta condición verificamos si existe el path en nuestra base de datos, lo que no significa que verifique que la imagen exista en el servidor
    
       // TODO: Limpieza

       const nombreArr = modelo.img.split('/'); // modelo.img es nuestra secure_url, entonces dividimos la url separandola en los slash
       const nombre = nombreArr[nombreArr.length -1]; // definimos como nombre el ultimo elemento que nos devuelve el split
       const [ public_id ] = nombre.split('.'); // finalmente al nombre de la imagen le quitamos la extension el archivo utilizando nuevamente el split
       cloudinary.uploader.destroy(public_id); 
    }

    const { tempFilePath } = req.files.archivo; // tempFilePath es una propiedad de req.files.archivo, es un path de almacenamiento temoral
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath ); // Ese es el path que le vamos a pasar a Cloudinary para la subida del archivo.

    modelo.img = secure_url;

    await modelo.save();

    res.json(modelo);
}

module.exports= {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}