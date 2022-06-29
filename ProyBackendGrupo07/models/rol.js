const mongoose = require("mongoose");
const area = require("./area");
const { Schema } = mongoose;
const RolSchema = new Schema({
    nombreRol: { type: String, required: true },
    areaAsignada: { type: Schema.Types.ObjectId, ref: "Area", required: true }
});

module.exports = mongoose.models.Rol || mongoose.model('Rol', RolSchema);