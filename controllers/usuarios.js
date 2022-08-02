const { response , request } = require('express'); // esta importación la hacemos para poder tener el autocompletado del objeto response de VS

const usuariosGet = (req = request , res = response) => {

    const {q , nombre = 'No name' , apikey } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey
    });
}

const usuariosPost = (req, res) => {
    
    const { nombre , edad } = req.body;
    
    
    res.json({
        msg: 'post API - controlador',
        nombre,
        edad
    });
}

const usuariosPut = (req, res) => {
    // video parametros de segmento y query
    //const id = req.id; // configurado en rutas.
                        // express ya lo trae configurado estos params

    // también podemos escribirlo mediante desestructuración de los params
    const { id } = req.params;

    res.json({
        msg: 'put API - controlador',
        id
    });
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API - controlador'
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