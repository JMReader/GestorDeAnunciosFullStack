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
router.get('/filtro/estado/:estado', AnuncioController.filtrarAnunciosPendientes);
router.get('/filtro/txt/:texto', AnuncioController.filtrarTexto);
router.get('/filtro/fechas', AnuncioController.CreadosEntrefechas);
router.get('/filtro/redactor/:redactor', AnuncioController.filtrarRedactor);
router.get('/filtro/destinatario/:destinatario', AnuncioController.filtrarDestinatario);
router.get('/filtro/medio/:medio', AnuncioController.filtrarMedio);
router.get('/filtro/tipo/:contenido', AnuncioController.filtrarContenido);
router.get('/filtro/area/:area', AnuncioController.obtenerPorArea);
module.exports = router;