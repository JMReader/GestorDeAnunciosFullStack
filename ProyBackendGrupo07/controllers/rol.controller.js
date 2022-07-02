const Rol = require('../models/rol');
const area = require('../models/area');
const rolCtrl  = {}

rolCtrl.getRoles = async (req,res)=>{
    var roles = await Rol.find().populate('areaAsignada');
    res.json(roles);
}

rolCtrl.createRol = async (req, res) => {
    var rol = new Rol(req.body);
    var rnuevo = await area.find({$and : [{_id:rol.areaAsignada}, { roles: { $in : [rol.nombreRol] }}]});
    console.log(rnuevo);
    if(rnuevo[0] == null){
        console.log("xd")
        try {
            let ar = await area.findById(rol.areaAsignada);
            ar.roles.push(rol.nombreRol)
            await area.updateOne({ _id: rol.areaAsignada }, ar);
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
    }else{

        res.status(400).json({
            'status': '0',
            'msg': 'Este Rol ya se encuentra en el area.'
        })
    }

}

rolCtrl.buscarRol =  async (req,res)=>{
    var rol = await Rol.findById(req.params._id).populate('areaAsignada');
    res.json(rol);
    console.log(rol);
}

module.exports = rolCtrl;