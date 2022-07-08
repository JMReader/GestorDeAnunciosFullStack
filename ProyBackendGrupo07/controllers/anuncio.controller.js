const anuncio = require("../models/anuncio");
const rol = require("../models/rol");
const area = require("../models/area");
const empleado = require("../models/empleado");
const nodemailer = require("nodemailer");
const AnuncioController = {};

AnuncioController.crearAnuncio = async (req, res) => {
    var Anuncio = new anuncio(req.body);
    try {
        console.log(req.body);
        if (Anuncio.estado == "Confeccionado") {
            var mails;
            //buscamos el jefe de area
            var a = await area.findById(Anuncio.area)
            //por si falla   
            //           for (let i = 1; i < a.encargado.length; i++) {
            //              var e = await empleado.findById(a.encargado[i])
            //            console.log(a.encargado);
            //          if(i==1){
            //por si falla

            for (let i = 0; i < a.encargado.length; i++) {
                var e = await empleado.findById(a.encargado[i])
                if (i == 0) {
                    mails = e.email;
                    console.log(mails)
                } else {
                    mails = mails + ", " + e.email;
                }
            }
            console.log("Ok");
            console.log(mails);
            //transportador del mensaje (quien lo envia en este caso un mail temporal )
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: "juanmcoro2003@gmail.com", // Mail del qie se va a enviar el mensaje
                    pass: "lizpxnvjjtbtaiqd", // contraseña de applicacion que nos da google, (debemos tener la oauth 2)
                },
                tls: {
                    rejectUnauthorized: false
                }

            });

            let info = await transporter.sendMail({//info del mensaje que se va a enviar
                from: '"Anuncios Paloma" <juanmcoro2003@gmail.com>', // sender address
                to: mails, // variable con todos los mails de los destinatarios
                subject: "Nuevo Anuncio", // Subject line
                text: "Tenes para actualizar un anuncio", // plain text body
                html: " <b>Nuevo anuncio para autorizar!!</b> <br>  <p>Hola encagado!!"
                    + " alguien en tu area a subido un anuncio para revisar de titulo <b>" + Anuncio.titulo + "</b>, ve a hacerlo antes de que sea tarde!!! </p>"
                    + "<br> <img style='height: 228px; width: 390px; margin-left:114px;'  src='https://cdn.discordapp.com/attachments/987427041001504849/993760187552890880/unknown.png'> <br> ", // html body
            });

            console.log("Message sent: %s", info.messageId);
        }
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
        if (nuevoAnuncio.estado == "Confeccionado") {
            var mails;
            //buscamos el jefe de area
            var r = await rol.findById(nuevoAnuncio.destinatarios[0])
            var a = await area.findById(r.areaAsignada)
            /*Por si falla        
                    for (let i = 1; i < a.encargado.length; i++) {
                        var e = await empleado.findById(a.encargado[i])
                        if(i==1){
           */
            for (let i = 0; i < a.encargado.length; i++) {
                var e = await empleado.findById(a.encargado[i])
                if (i == 0) {
                    mails = e.email;
                    console.log(mails)
                } else {
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
                from: '"Anuncios Paloma" <juanmcoro2003@gmail.com>', // sender address
                to: mails, // variable con todos los mails de los destinatarios
                subject: "Nuevo Anuncio", // Subject line
                text: "Tenes para actualizar un anuncio", // plain text body
                html: " <b>Nuevo anuncio para autorizar!!</b> <br>  <p>Hola encagado!!"
                    + " alguien en tu area a subido un anuncio para revisar de titulo <b>" + Anuncio.titulo + "</b>, ve a hacerlo antes de que sea tarde!!! </p>"
                    + "<br> <img style='height: 228px; width: 390px; margin-left:114px;'  src='https://cdn.discordapp.com/attachments/987427041001504849/993760187552890880/unknown.png'> <br> ", // html body
            });

            console.log("Message sent: %s", info.messageId);
        }

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
        const anuncios = await anuncio.find({ destinatarios: { $in: [desti] } });
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
        const redac = req.params.redactor;

        const anuncios = await anuncio.find({ redactor: redac }).populate('redactor');
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
AnuncioController.filtrarMedio = async (req, res) => {
    if (req.params.medio == "Facebook") {
        try {

            //el in busca dentro de un array el valor que especifiquemos :))
            const anuncios = await anuncio.find({ fbSelected: true });
            res.status(200).json(anuncios);
        } catch (error) {
            console.log(error)
            res.status(400).json({
                status: '0',
                msg: 'Error al filtrar los anuncios'
            })
        }

    } else if (req.params.medio == "TV") {
        try {
            //el in busca dentro de un array el valor que especifiquemos :))
            const anuncios = await anuncio.find({ tvSelected: true });
            res.status(200).json(anuncios);
        } catch (error) {
            console.log(error)
            res.status(400).json({
                status: '0',
                msg: 'Error al filtrar los anuncios'
            })
        }
    } else {


        try {
            const med = req.params.medio;
            //el in busca dentro de un array el valor que especifiquemos :))
            const anuncios = await anuncio.find({ medios: { $in: [med] } });
            res.status(200).json(anuncios);
        } catch (error) {
            console.log(error)
            res.status(400).json({
                status: '0',
                msg: 'Error al filtrar los anuncios'
            })
        }
    }
}

//buscar por tipo de cont
AnuncioController.filtrarContenido = async (req, res) => {
    try {
        const cont = req.params.contenido;
        //el in busca dentro de un array el valor que especifiquemos :))
        const anuncios = await anuncio.find({ tipo: cont });
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

AnuncioController.CreadosEntrefechas = async (req, res) => {
    try {
        var hasta = req.query.hasta
        console.log(req.query.hasta);
        var desde = req.query.desde
        //const anun = await anuncio.find({fechaCreacion: {"$gte" : desde, "$lte" : hasta}})
        const anun = await anuncio.find(
            {
                $and: [
                    { fechaCreacion: { $gte: new Date(desde), $lt: new Date(hasta) } }
                ]
            }
        ).populate('area').populate('redactor')
        res.json(anun)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: '0',
            msg: "Error al buscar entre fechas"
        })
    }
}


AnuncioController.filtrarAnunciosPendientes = async (req, res) => {
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

AnuncioController.filtrarTexto = async (req, res) => {
    try {
        const txt = req.params.texto;

        const anuncios = await anuncio.find({ titulo: { $regex: txt } })
        res.status(200).json(anuncios);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: '0',
            msg: 'Error al filtrar los anuncios'
        })
    }
}

AnuncioController.obtenerPorArea = async (req, res) => {
    try {
        const areaBuscada = req.params.area;

        const anuncios = await anuncio.find({ area: areaBuscada }).populate('area');
        res.status(200).json(anuncios);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: '0',
            msg: 'Error al filtrar los anuncios'
        })
    }
}

AnuncioController.filtrarPorTodo = async (req, res) => {
    var filtros = req.query.filtros;
    console.log(filtros);
    var anuncios;
    var query = {};
    console.log(filtros);
    filtros.forEach(async element => {
        switch (element) {
            case "Fechas": {
                const hasta = req.query.hasta;
                const desde = req.query.desde;
                query["fechaCreacion"] = { $gte: new Date(desde), $lt: new Date(hasta) };
                break;
            }
            case "Medio": {
                const medio = req.query.medio;

                if (medio == "Facebook") {
                    query["fbSelected"] = true;
                } else if (medio == "TV") {
                    query["tvSelected"] =  true;
                } else {
                    query["medios"] = { $in: [medio] };
                }
                break;
            }
            case "Titulo": {
                const titulo = req.query.titulo;
                query["titulo"] = { $regex: titulo };
                break;
            }
            case "Tipo": {
                const tipo = req.query.tipo;
                query["tipo"] = tipo;
                break;
            }
            case "Estado": {
                const estado = req.query.estado;
                query["estado"] = estado;
                break;
            }
            case "Redactor": {
                const redactor = req.query.redactor;
                query["redactor"] = redactor;
                break;
            }
            case "Destinatario": {
                const desti = req.query.destinatario;
                query["destinatarios"] = { $in: [desti] };
                break;
            }
        }
    });
    anuncios = await anuncio.find(query);
    res.json(anuncios)
}

module.exports = AnuncioController;