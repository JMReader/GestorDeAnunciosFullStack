const Empleado = require('../models/empleado');
const empCtrl = {}

empCtrl.getEmpleados= async (req, res) => {
    try {
        var empleados = await Empleado.find();
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

// usuarioCtrl.loginUsuario = async (req, res) => {

//     const criteria = {
//         username: req.body.username,
//         password: req.body.password
//     }

//     Usuario.findOne(criteria, function (err, user) {
//         if (err) {
//             res.json({
//                 status: 0,
//                 msg: 'Error procesando operacion.'
//             })
//         };

//         if (!user) {
//             res.json({
//                 status: 0,
//                 msg: "Usuario no encontrado"
//             })
//         } else {
//             res.json({
//                 status: 1,
//                 msg: "Usuario encontrado",
//                 username: user.username,
//                 perfil: user.perfil, 
//                 userid: user._id
//             })
//         }
//     }
//     )
// }

module.exports = empCtrl;