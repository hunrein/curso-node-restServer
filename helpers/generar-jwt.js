const jwt = require('jsonwebtoken');



const generarJWT = ( uid = '' ) => {

    // Creamos una nueva promesa ya que JWT aún no trabaja con ellas sino con callbacks
    return new Promise( (resolve , reject) =>{

        const payload = { uid }; // 

        // para firmar token usamos este método, primer argumento el payload (id del usuario), segundo nuestra clave secreta que creamos en .env y en el tercero las opciones que nos permite este paquete
        jwt.sign( payload , process.env.SECRETORPRIVATEKEY, {
            expiresIn: '24h'
        }, ( err , token )=>{ // resolución del callback
            if( err ){
                console.log(err);
                reject('No se pudo generar el token')
            }else{
                resolve( token );
            }
        })
    })

}




module.exports = {
    generarJWT
}