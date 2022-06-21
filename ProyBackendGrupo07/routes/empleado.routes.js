const empCtrl = require('./../controllers/empleado.controller');

const express = require('express');
const router = express.Router();

router.get('/obtener', empCtrl.getEmpleados);
router.post('/crear', empCtrl.createEmpleado);
//router.post('/login', usuarioCtrl.loginUsuario);

module.exports = router;