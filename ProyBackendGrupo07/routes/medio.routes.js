const medioCtrl = require('./../controllers/medio.controller');

const express = require('express');
const router = express.Router();

router.get('/obtener', medioCtrl.getMedios);
router.post('/crear', medioCtrl.createMedio);

module.exports = router;