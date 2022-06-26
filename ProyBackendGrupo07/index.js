const express = require('express');
const cors = require('cors');
const {mongoose} = require('./database');
var app = express();
//middlewares
app.use(express.json({limit: '25mb'}));
app.use(cors({origin: 'http://localhost:4200'}));
//Cargamos el modulo de direccionamiento de rutas (actualizar a nuestras nuevas rutas :p)
app.use('/anuncio', require('./routes/anuncio.routes'));
app.use('/empleado', require('./routes/empleado.routes'));
app.use('/area', require('./routes/area.routes'));
app.use('/rol', require('./routes/rol.routes'));
/*app.use('/transacciones', require('./routes/transaccion.route'));
app.use('/persona', require('./routes/persona.route'));
app.use('/pasaje', require('./routes/pasaje.route'));*/
//setting (decimos el puerto que va a usar el servidor)
app.set('port', process.env.PORT || 3000);
//starting the server, incia el server
app.listen(app.get('port'), () => {




    
console.log(`Server iniciado en puerto: `, app.get('port'));
});
