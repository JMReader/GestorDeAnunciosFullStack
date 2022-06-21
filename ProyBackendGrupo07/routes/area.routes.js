const areaCtrl = require('../controllers/area.controller');

const express = require('express');
const router = express.Router();

router.get('/obtener', areaCtrl.getAreas );
router.post('/crear', areaCtrl.createArea);
router.put('/actualizar/:id', areaCtrl.updateArea);

module.exports = router;