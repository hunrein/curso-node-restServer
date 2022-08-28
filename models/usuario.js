

const { Schema , model } = require('mongoose');

// Modelo
// Es el equivalente a una tabla de sql

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img:{
        type: String,
    },
    rol:{
        type: String,
        required: true,        
        enum:[ 'ADMIN_ROLE' , 'USER_ROLE' ],
        default: 'USER_ROLE',
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    },


});

// para sobreescribir los methods debemos usar funciones normales ya que debemos utilizar el objeto this
// y en las funciones flecha este apunta fuera de la misma y las funciones normales apuntan a la instancia creada
UsuarioSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario } = this.toObject(); //desestructuramos el usuario para separar __v y password del resto de los elementos. ( operador rest )
    usuario.uid = _id;
    return usuario;
}// esta modificación del método JSON quita estos campos del objeto usuario de la respuesta

module.exports = model( 'Usuario', UsuarioSchema );