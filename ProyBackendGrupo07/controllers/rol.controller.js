const Rol = require('../models/rol');
const rolCtrl  = {}

rolCtrl.getRoles = async (req,res)=>{
    var roles = await Rol.find().populate('areaAsignada');
    res.json(roles);
}

rolCtrl.createRol = async (req, res) => {
    var rol = new Rol(req.body);
    try {
        await rol.save();
        res.json({
            'status': '1',
            'msg': 'Rol guardado correctamente.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

rolCtrl.buscarRol =  async (req,res)=>{
    var rol = await Rol.findById(req.params._id).populate('areaAsignada');
    res.json(rol);
    console.log(rol);
}

module.exports = rolCtrl;