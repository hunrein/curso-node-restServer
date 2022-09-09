/* EXPRESS BASADO EN CLASES */

const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConection } = require('../DB/config');


class Server {

    constructor() {
        // LAS PROPIEDADES SE DEFINEN DENTRO DEL CONSTRUCTOR
        this.app = express();
        this.port = process.env.PORT;
        this.path = {
            auth :      '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            uploads:    '/api/uploads',
            usuarios:   '/api/usuarios'
        }

        // CONECTAR A LA BASE DE DATOS
        this.conectarDB();

        //MIDDLEWARES - son funciones que se ejecutan antes de llamar un controlador o seguir con la ejecución de las peticiones
        this.middlewares();

        // RUTAS DE LA APLICACIÓN
        this.routes();
        
    }

    async conectarDB(){
        await dbConection();
    }


    middlewares(){

        //CORS
        this.app.use( cors() );

        // LECTURA Y PARSEO DEL BODY
        this.app.use( express.json() ); // en usuarios controllers se utiliza desde req.body

        //DIRECTORIO PÚBLICO
        this.app.use( express.static('public') );

        // FILEUPLOAD - CARGA DE ARCHIVOS
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    // DEFINIMOS LAS RUTAS DENTRO DE UN MÉTODO LLAMADO ROUTES
    routes(){
       this.app.use( this.path.auth , require( '../routes/auth' ) );
       this.app.use( this.path.buscar , require( '../routes/buscar' ));
       this.app.use( this.path.categorias , require( '../routes/categorias' )); 
       this.app.use( this.path.productos , require( '../routes/productos' ));
       this.app.use(this.path.uploads , require( '../routes/uploads'));
       this.app.use( this.path.usuarios , require( '../routes/usuarios' ));       
    }

    listen(){ 
        this.app.listen( this.port, ()=> {
            console.log('servidor corriendo en puerto' , this.port);
        });
    }

}




module.exports = Server;