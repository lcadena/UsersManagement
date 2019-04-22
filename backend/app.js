'use strict'

//Importar librerías
const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const cors = require('cors')
//const morgan = require('morgan');
const app = express()
const api_user = require('./routes/user')
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../swagger.json');

//Método use
app.use(bodyParser.urlencoded({ extended: false}))

//Permitir peticiones con formato de mensaje JSON
app.use(bodyParser.json())

app.use(cors({origin: '*'}))

//Ficheros hbs
app.engine('.hbs', hbs({
    defaultLayout: 'default',
    extname: '.hbs'
}))

//View engine = .hbs
app.set('view engine', '.hbs')


//configurar el modo plantilla
//le decimos a la app que en nuestra ruta /api utilize el modulo api
app.use('/api', api_user)
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

//Renderizar login
app.get('/login', (req, res) => {
    res.render('login')
})

//cabecera de cros mas restictiva
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin","http://localhost:4200");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    }
    next()
})

module.exports = app