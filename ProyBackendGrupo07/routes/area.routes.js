const areaCtrl = require('../controllers/area.controller');
const autCtrl = require('./../controllers/auth.controller');

const express = require('express');
const router = express.Router();

router.get('/obtener', areaCtrl.getAreas );
router.post('/crear',autCtrl.verifyToken, areaCtrl.createArea);
router.put('/actualizar/:_id',autCtrl.verifyToken, areaCtrl.updateArea);

module.exports = router;