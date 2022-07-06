const jwt = require('jsonwebtoken');
const Empleado = require('../models/empleado');
const Area = require('../models/area');
const empCtrl = {}

empCtrl.getEmpleados = async (req, res) => {
    try {
        var empleados = await Empleado.find().populate("area").populate("roles");
        res.json(empleados);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 0,
            msg: "Error al obtener los usuarios"
        })
    }
}

 
empCtrl.createEmpleado = async (req, res) => {

    const empleado = new Empleado(req.body);
    console.log(empleado)
    if (empleado.esEncargado==true){
        ar = await Area.findById(empleado.area)
        ar.encargado.push(empleado._id) 
        await Area.updateOne({ _id: empleado.area }, ar);
    }
    try {
        await empleado.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Empleado guardado correctamente.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

empCtrl.loginUsuario = async (req, res) => {

    const criteria = {
        username: req.body.username,
        password: req.body.password
    }
    //const user = await Empleado.findOne(criteria).populate("area").populate("roles");
    //res.json(user);
    //.populate("area");
    Empleado.findOne(criteria).populate("area").populate("roles").exec(function (err, user) {
        if (err) {
            res.json({
                status: 0,
                msg: 'Error procesando operacion.'
            })
        };

        if (!user) {
            res.json({
                status: 0,
                msg: "Usuario no encontrado"
            })
        } else {
            const unToken = jwt.sign({id: user._id}, "secretkey");// creo un token y guardo el user id en el campo secretkey y recien tendra acceso 
            res.json({
                status: 1,
                msg: "Usuario encontrado", 
                user: user,
                token: unToken 
            }) 
        }
    }
    )
}
 
module.exports = empCtrl;