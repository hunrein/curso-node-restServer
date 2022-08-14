const { response , request } = require('express'); // esta importación la hacemos para poder tener el autocompletado del objeto response de VS
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');





const usuariosGet = async (req = request , res = response) => {

    // const {q , nombre = 'No name' , apikey } = req.query;

    const { limite = 5 , desde = 0 } = req.query; // desestructuración de los parámetros que vienen por el url
    const query = { estado: true}

    /* const usuarios = await Usuario.find(query)
        .skip(desde) // indica desde que registro comienza la paginación
        .limit(limite) // indica cuantos registros debe mostrar

    const total = await Usuario.countDocuments(query); */

    // al tener que ejecutar 2 promesas, es conveniente usar Promise.all que las ejecuta de manera simultanea.
    // ya que de la forma en que está escrito el código arriba, cada await debe ejecutarse bloqueando el hilo y luego continuar con el siguiente
    const [total , usuarios] = await Promise.all([ // usamos desestructuración de arreglos para darle nombre a las respuestas de cada promesa, al ser arreglos, el primer elemento será el nombre de la primer promesa, etc
        await Usuario.countDocuments(query),
        await Usuario.find(query)
            .skip(desde) 
            .limit(limite)
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req, res) => {
    
    

    const { nombre , correo , password , rol } = req.body;
    const usuario = new Usuario({ nombre, correo , password , rol });

    // PASOS ANTES DE GUARDAR UN USUARIO

    //Verificar si el correo existe
   
    /* const existeEmail = await Usuario.findOne({correo});
    if( existeEmail){
        return res.status(400).json({
            msg: 'El correo ya está registrado'
        })
    } */

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);
    // usuario.password es el que voy a grabar // el password que paso a hashSync es el que viene en req.body


    // Guardar en base de datos
    await usuario.save();
    
    res.json({
        msg: 'post API - controlador',
        usuario
    });
}

const usuariosPut = async (req, res) => {
    // video parametros de segmento y query
    //const id = req.id; // configurado en rutas.
                        // express ya lo trae configurado estos params

    // también podemos escribirlo mediante desestructuración de los params
    const { id } = req.params;
    const { _id , password , google , correo , ...resto } = req.body;

    // TODO validar contra base de datos

    if ( password ){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id , resto)

    res.json( usuario );
}

const usuariosDelete = async(req, res) => {
    
    const { id } = req.params;
    
    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    // Mediante cambio de estado
    const usuario = await Usuario.findByIdAndUpdate( id , {estado: false });

    res.json({
        usuario
    });
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'path API - controlador'
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}