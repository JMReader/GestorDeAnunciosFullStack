const anuncio = require("../models/anuncio");
const AnuncioController = {};

AnuncioController.crearAnuncio = async (req, res) => {
    var Anuncio = new anuncio(req.body);
    try {
        await Anuncio.save();
        res.json({
            'status': '1',
            'msg': 'Anuncio correctamente guardado :))'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': error.message
        })
    }
}


//editar
AnuncioController.editarAnuncio = async (req, res) => {
    const nuevoAnuncio = new Anuncio(req.body);
    try {
        await anuncio.updateOne({ _id: req.params.id }, nuevoAnuncio);
        res.json({
            'status': '1',
            'msg': 'Anuncio actualizado correctamente'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error al actualizar el auncio'
        })
    }
}


AnuncioController.getAnuncios = async (req, res) => {
    try {
        var Anuncios = await anuncio.find();
        res.json(Anuncios);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 0,
            msg: "Error al obtener los Anuncios"
        })
    }
}

AnuncioController.filtrarDestinatario = async (req, res) => {

}






// eliminar
AnuncioController.Borrar = async (req, res) => {
    try {
        await Anuncio.findByIdAndDelete({ _id: req.params.id })
        res.json({
            status: '1',
            message: "Anuncio eliminado correctamente"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: '0',
            msg: "Error al eliminar Anuncio"
        })
    }
}
module.exports = AnuncioController;