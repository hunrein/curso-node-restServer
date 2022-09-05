const {response , request} = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');


const validarJWT = async ( req = request , res = response , next ) =>{

    const token = req.header( 'x-token' );

    if( !token ){
        return res.status(400).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify( token , process.env.SECRETORPRIVATEKEY);

        // leer el usuario que corresponde al uid desde el modelo
       const usuario = await Usuario.findById( uid );

       // Si el uid nos devuelve null o undefined
       if( !usuario ){
            return res.status(401).json({
                msg: 'No existe el usuario en la DB'
            })
       }

        // Luego de encontrar el usuario en la DB comprobamos que su estado sea true

        if ( !usuario.estado ){
            return res.status(401).json({
                msg: 'No existe el usuario - Usuario con estado false'
            })
        }

        req.usuario = usuario;

        next();

    } catch (error) {

        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        });
        
    }

    //console.log(token);

    

}



module.exports = {
    validarJWT
}