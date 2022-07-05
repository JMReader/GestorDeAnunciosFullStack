const mongoose = require('mongoose');
const {Schema} = mongoose;

const AnuncioSchema = new Schema({
   titulo: {type: String, required: false},
   tipo: {type: String, required: true},
   medios: {type: [Schema.Types.ObjectId], ref:"Medio", required: true},
   tvSelected: {type: Boolean, required: true},
   fbSelected: {type: Boolean, required: true},
   fechaCreacion: {type: Date, required: true},//hora de la creacion del anuncio :)
   fechaEntrada: {type: Date, required: false},//autorizacion
   fechaSalida: {type: Date, required: false},
   estado: {type: String, required: false},
   destinatarios: {type: [Schema.Types.ObjectId],ref: "Rol", required: 'debe asignar a quien esta dirigido el anuncio'},
   recursos: {type: [String], required: true},
   tiempoLectura: {type:String, required:false},
   redactor: {type: Schema.Types.ObjectId, ref: "Empleado", required: false},
   area: {type: Schema.Types.ObjectId, ref: "Area", required: false}
});

module.exports = mongoose.models.Anuncio || mongoose.model('Anuncio', AnuncioSchema);