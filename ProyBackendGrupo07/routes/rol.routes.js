const rolCtrl = require('../controllers/rol.controller');

const express = require('express');
const router = express.Router();

router.get('/obtener', rolCtrl.getRoles);
router.post('/crear', rolCtrl.createRol);

module.exports = router;