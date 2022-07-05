const empCtrl = require('./../controllers/empleado.controller');
const autCtrl = require('./../controllers/auth.controller');

const express = require('express');
const router = express.Router();

router.get('/obtener', autCtrl.verifyToken, empCtrl.getEmpleados);
router.post('/crear', autCtrl.verifyToken, empCtrl.createEmpleado);
router.post('/login', empCtrl.loginUsuario);

module.exports = router;