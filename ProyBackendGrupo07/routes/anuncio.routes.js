//defino el controlador de la api 
const AnuncioController = require('../controllers/anuncio.controller');
//creamos el manejador de rutas express
const express = require('express');
const router = express.Router();
//definimos rutas 
router.delete('/borrar/:id', AnuncioController.Borrar);
router.post('/crear', AnuncioController.crearAnuncio);
router.get('/obtener', AnuncioController.getAnuncios);
router.put('/actualizar/:id', AnuncioController.editarAnuncio);
router.get('/filtro/:estado', AnuncioController.filtrarAnunciosPendientes);
module.exports = router;