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
    const nuevoAnuncio = new anuncio(req.body);
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
        var Anuncios = await anuncio.find().populate('redactor').populate('destinatarios').populate('area');
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
    try {
        const desti = req.params.destinatario;
        //el in busca dentro de un array el valor que especifiquemos :))
        const anuncios = await anuncio.find({ destinatarios: { $in : [desti] }});
        res.status(200).json(anuncios);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: '0',
            msg: 'Error al filtrar los anuncios'
        })
    }
}
//buscar por redactor
AnuncioController.filtrarRedactor = async (req, res) => {
    try {
        const redac= req.params.redactor;
        
        const anuncios = await anuncio.find({ redactor: redac}).populate('redactor');
        res.status(200).json(anuncios);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: '0',
            msg: 'Error al filtrar los anuncios'
        })
    }
}
//buscar porr medio 
AnuncioController.filtrarMedio= async (req, res) => {

    try {
        const med = req.params.medio;
        //el in busca dentro de un array el valor que especifiquemos :))
        const anuncios = await anuncio.find({ medio: { $in : [med] }});
        res.status(200).json(anuncios);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: '0',
            msg: 'Error al filtrar los anuncios'
        })
    }
}

//buscar por tipo de cont
AnuncioController.filtrarContenido= async (req, res) => {

    try {
        const cont = req.params.contenido;
        //el in busca dentro de un array el valor que especifiquemos :))
        const anuncios = await anuncio.find({ tipo: cont});
        res.status(200).json(anuncios);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: '0',
            msg: 'Error al filtrar los anuncios'
        })
    }
}
// eliminar
AnuncioController.Borrar = async (req, res) => {
    try {
        await anuncio.findByIdAndDelete({ _id: req.params.id })
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

AnuncioController.CreadosEntrefechas= async (req, res) => {
    try {
        var hasta = req.query.hasta
        console.log(req.query.hasta);
        var desde = req.query.desde
        const anun = await anuncio.find({fechaCreacion: {"$gte" : desde, "$lte" : hasta}})
        res.json(anun)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: '0',
            msg: "Error al buscar entre fechas"
        })
    }
}


AnuncioController.filtrarAnunciosPendientes = async (req, res) =>{
    try {
        const estado = req.params.estado;
        
        const anuncios = await anuncio.find({ estado: estado });
        res.status(200).json(anuncios);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: '0',
            msg: 'Error al filtrar los anuncios'
        })
    }
}

AnuncioController.filtrarTexto= async (req, res) =>{
    try {
        const txt =  req.params.texto ;
        
        const anuncios = await anuncio.find({texto : {$regex : txt}})
        res.status(200).json(anuncios);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: '0',
            msg: 'Error al filtrar los anuncios'
        })
    }
}

AnuncioController.obtenerPorArea = async (req,res) =>{
    try {
        const areaBuscada= req.params.area;
        
        const anuncios = await anuncio.find({ area: areaBuscada}).populate('area');
        res.status(200).json(anuncios);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: '0',
            msg: 'Error al filtrar los anuncios'
        })
    }
}

module.exports = AnuncioController;