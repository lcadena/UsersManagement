'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api_user = require('./routes/user')
const hbs = require('express-handlebars')
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../swagger.json');


app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
//configurar el modo plantilla
//le decimos a la app que en nuestra ruta /api utilize el modulo api
app.use('/api', api_user)
//app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = app