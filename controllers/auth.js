const { response, json } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async( req , res = response ) => {

    const { correo , password } = req.body;

    try {

        // Verificar si el correo existe
        const usuario = await Usuario.findOne({correo});
        if( !usuario ){

            return res.status(400).json({
                msg:'Usuario / Password no son correctos - correo'
            });
        }

        // Verfificar si el usuario está activo
        if( !usuario.estado ){

            return res.status(400).json({
                msg:'Usuario / Password no son correctos - estado: false'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validPassword ){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            msg: 'Login ok',
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:'Hable con el administrador'
        })
    }

    
}

const googleSignIn = async( req , res = response ) => {

    const { id_token } = req.body;
    

    try {

        const { nombre , img , correo } = await googleVerify( id_token );
        
        let usuario = await Usuario.findOne({ correo });
        
        if ( !usuario ){// verifico si el usuario que intenta ingresar No existe
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: '.',
                img,
                google: true,
                rol: 'USER_ROLE'
            };// nombre, correo e imagen vienen de google.
            // la data respeta las propiedades de nuestro modelo de usuario

            usuario = new Usuario( data );
            //console.log(usuario)
            await usuario.save();
        }

        // Si el usuario en DB
        if( !usuario.estado ){
            return res.status(401).json({
                msg: 'Hable con el administrador - Usuario bloqueado'
            })
        }

        // Generar el JWT
        const token = await generarJWT( usuario._id );
        
       
        res.json({
        usuario,
        token
        }) 

    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }

    
}

module.exports = {
    login,
    googleSignIn
}