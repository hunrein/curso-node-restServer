/* EXPRESS BASADO EN CLASES */

const express = require('express')
const cors = require('cors');

class Server {

    constructor() {
        // LAS PROPIEDADES SE DEFINEN DENTRO DEL CONSTRUCTOR
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //MIDDLEWARES
        this.middlewares();

        // RUTAS DE LA APLICACIÓN
        this.routes();
        
    }

    middlewares(){

        //CORS
        this.app.use( cors() );

        // LECTURA Y PARSEO DEL BODY
        this.app.use( express.json() ); // en usuarios controllers se utiliza desde req.body

        //DIRECTORIO PÚBLICO
        this.app.use( express.static('public') );
    }

    // DEFINIMOS LAS RUTAS DENTRO DE UN MÉTODO LLAMADO ROUTES
    routes(){
       this.app.use(this.usuariosPath , require('../routes/usuarios'))
    }

    listen(){ 
        this.app.listen( this.port, ()=> {
            console.log('servidor corriendo en puerto' , this.port);
        });
    }

}




module.exports = Server;