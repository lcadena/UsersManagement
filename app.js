'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api_user = require('./routes/user')
const hbs = require('express-handlebars')


app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
//configurar el modo plantilla
//le decimos a la app que en nuestra ruta /api utilize el modulo api
app.use('/api', api_user)

module.exports = app