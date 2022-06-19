const mongoose = require('mongoose');
const {Schema} = mongoose;

const AnuncioSchema = new Schema({
    texto: {type: String, required: false},
    tipo: {type: String, required: false},
    medio: {type: String, required: false},
    fechaEntrada: {type: Object, required: 'debe asignar uno o mas roles'},
   fechaSalida: {type: String, required: 'debe asignar un usuario al empleado para darlo de alta'},
   estado: {type: String, required: 'debe asignar un usuario al empleado para darlo de alta'},
   destinatarios: {type: String, required: 'debe asignar una contraseña al empleado para darlo de alta'},
   recurso: {type:String, required: true},
   tiempoLectura: {type:Number, required:'debe indiciar si este usuario es encargado de su area'},
   redactor: {type: Schema.Types.ObjectId, ref: "Usuario", required: true},
});



module.exports = mongoose.models.Anuncio || mongoose.model('Anuncio', AnuncioSchema);