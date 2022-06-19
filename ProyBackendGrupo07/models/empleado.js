const mongoose = require('mongoose');
const {Schema} = mongoose;

const UsuarioSchema = new Schema({
    nombre: {type: String, required: false},
    apellido: {type: String, required: false},
    email: {type: String, required: false},
    roles: {type: Object, required: 'debe asignar uno o mas roles'},
   //area :)
    dni: {type: String, required: 'debe asignar un usuario al empleado para darlo de alta'},
    usuario: {type: String, required: 'debe asignar un usuario al empleado para darlo de alta'},
    password: {type: String, required: 'debe asignar una contraseña al empleado para darlo de alta'},
    legajo: {type:String, required: true},
    esEncargado: {type:Number, required:false},
});



module.exports = mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);