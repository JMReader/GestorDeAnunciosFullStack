//defino el controlador de la api 
const AnuncioController = require('../controllers/anuncio.controller');
const autCtrl = require('./../controllers/auth.controller');
//creamos el manejador de rutas express
const express = require('express');
const router = express.Router();
//definimos rutas 
router.delete('/borrar/:id',autCtrl.verifyToken, AnuncioController.Borrar);
router.post('/crear',autCtrl.verifyToken, AnuncioController.crearAnuncio);
router.get('/obtener', AnuncioController.getAnuncios);
router.put('/actualizar/:id',autCtrl.verifyToken, AnuncioController.editarAnuncio);
router.get('/filtro/estado/:estado', AnuncioController.filtrarAnunciosPendientes);
router.get('/filtro/txt/:texto', AnuncioController.filtrarTexto);
router.get('/filtro/fechas', AnuncioController.CreadosEntrefechas);
router.get('/filtro/redactor/:redactor', AnuncioController.filtrarRedactor);
router.get('/filtro/destinatario/:destinatario', AnuncioController.filtrarDestinatario);
router.get('/filtro/medio/:medio', AnuncioController.filtrarMedio);
router.get('/filtro/tipo/:contenido', AnuncioController.filtrarContenido);
router.get('/filtro/area/:area', AnuncioController.obtenerPorArea);
router.get('/filtro/todo', AnuncioController.filtrarPorTodo);
module.exports = router;