const mongoose = require('mongoose');
const area = require('./area');
const {Schema} = mongoose;

const EmpleadoSchema = new Schema({
    nombre: {type: String, required: false},
    apellido: {type: String, required: false},
    email: {type: String, required: false},
    roles: {type: [Schema.Types.ObjectId], required: 'debe asignar uno o mas roles'},
    area: {type: Schema.Types.ObjectId, ref: "area", required: true},
    dni: {type: String, required: 'debe asignar un usuario al empleado para darlo de alta'},
    username: { type: String, required: true },
    password: { type: String, required: true },
    legajo: {type:String, required: true},
    esEncargado: {type: Boolean, required: true}
});



module.exports = mongoose.models.Empleado || mongoose.model('Empleado', EmpleadoSchema);
