const mongoose = require("mongoose");
const { Schema } = mongoose;
const MedioSchema = new Schema({
    nombre: { type: String, required: true },
    usuario: { type: String, required: true },
    contraseña: { type: String, required: true },
});

module.exports = mongoose.models.Medio || mongoose.model('Medio', MedioSchema);