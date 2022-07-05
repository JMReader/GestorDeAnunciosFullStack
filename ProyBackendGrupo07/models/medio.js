const mongoose = require("mongoose");
const { Schema } = mongoose;
const MedioSchema = new Schema({
    nombre: { type: String, required: true },
});

module.exports = mongoose.models.Medio || mongoose.model('Medio', MedioSchema);