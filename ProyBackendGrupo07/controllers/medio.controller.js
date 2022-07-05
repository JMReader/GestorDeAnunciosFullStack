const Medio = require('../models/medio');
const medioCtrl  = {}

medioCtrl.getMedios = async (req,res)=>{
    var medios = await Medio.find();
    res.json(medios);
}

medioCtrl.createMedio = async (req, res) => {
    var medio = new Medio(req.body);
    try {
        await medio.save();
        res.json({
            'status': '1',
            'msg': 'Medio guardado correctamente.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }

}

module.exports = medioCtrl;