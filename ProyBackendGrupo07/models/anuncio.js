const mongoose = require('mongoose');
const {Schema} = mongoose;

const AnuncioSchema = new Schema({
   texto: {type: String, required: false},
   tipo: {type: String, required: true},
   medio: {type: [String], required: true},
   fechaEntrada: {type: Date, required: false},
   fechaSalida: {type: Date, required: false},
   estado: {type: String, required: false},
   destinatarios: {type: [Schema.Types.ObjectId], required: 'debe asignar a quien esta dirigido el anuncio'},
   recursos: {type: [String], required: true},
   tiempoLectura: {type:String, required:false},
   redactor: {type: Schema.Types.ObjectId, ref: "Empleado", required: false},
   fechaCreacion: {type: Date, required: true},
});

module.exports = mongoose.models.Anuncio || mongoose.model('Anuncio', AnuncioSchema);