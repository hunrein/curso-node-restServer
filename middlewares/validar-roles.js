const {response} = require('express');

const esAdminRole = ( req , res = response , next ) =>{

    if( !req.usuario ){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        })
    }

   
   const rol = req.usuario.rol;
   const nombre = req.usuario.nombre;
   console.log(rol);
   console.log(nombre);

    if( rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${ nombre } no es administrador - No puede realizar la acción solicitada`
        })
    }

    next();
}

const tieneRol = ( ...roles ) =>{ // con el operador spread tomo todos los argumentos que se le pasen a la función
    
    return ( req , res= response , next ) => {
        
        // verificación JWT
        if( !req.usuario ){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            })
        }

        // Verifica que el rol que posee el usuario está incluido dentro de los que tienen permisos
        if( !roles.includes( req.usuario.rol ) ){
            
            return res.status(401).json({
                msg: 'No tiene permisos para realizar esta acción'
            })
        }

        next();
    }
}



module.exports = {
    esAdminRole,
    tieneRol
}