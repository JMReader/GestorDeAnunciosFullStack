const anuncio = require("../models/anuncio");

const AnuncioController ={};

//crear
AnuncioController.crearAnuncio = async (req, res) => {
    var Anuncio = new anuncio(req.body);
    try {
    await Anuncio.save();
    res.json({
    'status': '1',
    'msg': 'Anuncio correctamente guardado :))'})
    } catch (error) {
    res.status(400).json({
    'status': '0',
    'msg': 'Error procesando operacion de guardado.'})
    }
    }
    

//editar
AnuncioController.editarAnuncio = async (req, res) => {
    const nuevoAnuncio = new Anuncio(req.body);
    try {
        await anuncio.updateOne({_id: req.body._id}, nuevoAnuncio);
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


// eliminar
AnuncioController.Borrar = async (req, res) => {
    try {
        await Anuncio.findByIdAndDelete({_id: req.params.id})
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