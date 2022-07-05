const anuncio = require("../models/anuncio");
const rol = require("../models/rol");
const area = require("../models/area");
const empleado  = require("../models/empleado");
const nodemailer = require("nodemailer");
const AnuncioController = {};

AnuncioController.crearAnuncio = async (req, res) => {
    var Anuncio = new anuncio(req.body);
    try {

        console.log(req.body);
        if (Anuncio.estado == "Confeccionado"){
            var mails ;
            //buscamos el jefe de area
            var a = await area.findById(Anuncio.area)
            
            
            for (let i = 0; i < a.encargado.length; i++) {
                var e = await empleado.findById(a.encargado[i])
                if(i==0){
                    
                    mails = e.email;
                    console.log(mails)
                }else{
                    mails = mails + ", " + e.email;
                }
            }
            console.log(mails);
            //transportador del mensaje (quien lo envia en este caso un mail temporal )
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                  user: "juanmcoro2003@gmail.com", // Mail del qie se va a enviar el mensaje
                  pass: "lizpxnvjjtbtaiqd", // contraseña de app
                },
                tls: {
                    rejectUnauthorized: false
                }

              });

              let info = await transporter.sendMail({//info del mensaje que se va a enviar
                from: '"Nuevo anuncio Para Autorizar" <juanmcoro2003@gmail.com>', // sender address
                to: mails, // list of receivers
                subject: "Nuevo Anuncio", // Subject line
                text: "tenes para actualizar un anuncio pa", // plain text body
                html: "<b>Nuevo anuncio para autorizar</b> <br> <p>Hola encagado!!"
                 + " alguien en tu area a subido un anuncio para revisar, ve a hacerlo antes de que sea tarde!!! </p>", // html body
              });

              console.log("Message sent: %s", info.messageId);}










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
        //console.log(nuevoAnuncio)
        //console.log(req.params.id)
        //si el anuncio es confeccionado procederemos a enviar un mail al encargado del area
        if (nuevoAnuncio.estado == "Confeccionado"){
            var mails ;
            //buscamos el jefe de area
            var r = await rol.findById(nuevoAnuncio.destinatarios[0])
            
            var a = await area.findById(r.areaAsignada)
            
            
            for (let i = 0; i < a.encargado.length; i++) {
                var e = await empleado.findById(a.encargado[i])
                if(i==0){
                    
                    mails = e.email;
                    console.log(mails)
                }else{
                    mails = mails + ", " + e.email;
                }
            }
            console.log(mails);
            //transportador del mensaje (quien lo envia en este caso un mail temporal )
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                  user: "juanmcoro2003@gmail.com", // Mail del qie se va a enviar el mensaje
                  pass: "lizpxnvjjtbtaiqd", // contraseña de app
                },
                tls: {
                    rejectUnauthorized: false
                }

              });

              let info = await transporter.sendMail({//info del mensaje que se va a enviar
                from: '"Nuevo anuncio Para Autorizar" <juanmcoro2003@gmail.com>', // sender address
                to: mails, // list of receivers
                subject: "Nuevo Anuncio", // Subject line
                text: "tenes para actualizar un anuncio pa", // plain text body
                html: "<b>Nuevo anuncio para autorizar</b> <br> <p>Hola encagado!!"
                 + " alguien en tu area a subido un anuncio para revisar, ve a hacerlo antes de que sea tarde!!! </p>", // html body
              });

              console.log("Message sent: %s", info.messageId);}

        await anuncio.updateOne({ _id: req.params.id }, nuevoAnuncio)
        res.json({
            'status': '1',
            'msg': 'Anuncio actualizado correctamente'
        })
    } catch (error) {
        console.log(error)
        res.json({
            'status': '0',
            'msg': 'Error al actualizar el auncio'
        })
    }

}

AnuncioController.getAnuncios = async (req, res) => {
    try {
        var Anuncios = await anuncio.find().populate('redactor').populate('medios').populate('destinatarios').populate('area');
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