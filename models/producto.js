


const { Schema , model } = require('mongoose')


const ProductoSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    precio:{
        Type: Number,
        default: 0
    },
    descripcion:{ Type: String },
    disponible:{ Type: Boolean },

});

ProductoSchema.methods.toJSON = function(){
    const { estado , __v, ...producto } = this.toObject(); 
    
    return producto;
}

module.exports = model( 'Producto' , ProductoSchema);