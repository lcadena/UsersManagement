'use strict'

//importar mongoose
const mongoose = require('mongoose')
//esquema de mongoose
const Schema = mongoose.Schema

//crea los campos del esquema del producto
const TiendaSchema = Schema({
  name: String,
  direccion: String,
  //relaciona una tienda y el listado de productos que dispone 
  listaProductos: [{ type: Schema.Types.ObjectId, ref: "Product"}]
})

module.exports = mongoose.model('Tienda', TiendaSchema)