const mongoose = require("mongoose");
const empleado = require("./empleado");
const { Schema } = mongoose;
const AreaSchema = new Schema({
    nombreArea: { type: String, required: true },
    encargado: { type: Schema.Types.ObjectId, ref: "Empleado"}
});

module.exports = mongoose.models.Area || mongoose.model('Area', AreaSchema);