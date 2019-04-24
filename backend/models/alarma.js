'use strict'

//importar mongoose
const mongoose = require('mongoose')
//esquema de mongoose
const Schema = mongoose.Schema
//const Producto = mongoose.model('product')


//crea los campos del esquema del producto
const AlarmSchema = Schema({
  name: String,
  limit: Number,
  category: String,
  initDate: Date,
  FinDate: Date,
})

module.exports = mongoose.model('Alarm', AlarmSchema)