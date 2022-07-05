const medioCtrl = require('./../controllers/medio.controller');
const autCtrl = require('./../controllers/auth.controller');

const express = require('express');
const router = express.Router();

router.get('/obtener', medioCtrl.getMedios);
router.post('/crear', autCtrl.verifyToken, medioCtrl.createMedio);

module.exports = router;