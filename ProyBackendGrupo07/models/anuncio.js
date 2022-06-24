const mongoose = require('mongoose');
const {Schema} = mongoose;

const AnuncioSchema = new Schema({
   texto: {type: String, required: true},
   tipo: {type: String, required: true},
   medio: {type: String, required: true},
   fechaEntrada: {type: String, required: false},
   fechaSalida: {type: String, required: false},
   estado: {type: String, required: false},
   destinatarios: {type: [Schema.Types.ObjectId], required: 'debe asignar a quien esta dirigido el anuncio'},
   recurso: {type:String, required: true},
   tiempoLectura: {type:String, required:false},
   redactor: {type: Schema.Types.ObjectId, ref: "Empleado", required: true},
});



module.exports = mongoose.models.Anuncio || mongoose.model('Anuncio', AnuncioSchema);