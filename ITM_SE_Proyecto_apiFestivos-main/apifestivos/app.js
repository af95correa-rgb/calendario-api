const express = require('express');
const bd = require('./repositorios/bd');
const app = express();
const bodyParser = require('body-parser'); 
//app.use(express.json());

//require('./routes/festivo.rutas')(app);
const router = require('./rutas/festivo.rutas');
const swaggerDocs = require('./configuracion/swagger');
swaggerDocs(app);

app.use(bodyParser.json());

bd.conectar();

app.use(router);
const port = 3030;

app.listen(port, () => {
    console.log(`Aplicacion ejecutandose en puerto: ${port}`)
});

