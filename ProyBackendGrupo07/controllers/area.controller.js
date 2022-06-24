const Area = require('../models/area');
const areaCtrl  = {}

areaCtrl.getAreas = async (req,res)=>{
    var areas = await Area.find().populate("encargado");
    res.json(areas);
}

areaCtrl.createArea = async (req, res) => {
    var area = new Area(req.body);
    try {
        await area.save();
        res.json({
            'status': '1',
            'msg': 'Area guardada correctamente.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

areaCtrl.updateArea = async (req,res) =>{
    const areaEd = new Area(req.body);
    try {
        await Area.updateOne({ _id: req.body._id }, areaEd);
        res.status(200).json({
            'status': '1',
            'msg': 'Area actualizada'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

module.exports = areaCtrl;