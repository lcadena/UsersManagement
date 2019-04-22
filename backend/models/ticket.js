'use strict'

//importar mongoose
const mongoose = require('mongoose')
//esquema de mongoose
const Schema = mongoose.Schema
//const Producto = mongoose.model('product')

//crea los campos del esquema del producto
const TicketSchema = Schema({
  name: String,
  cif: String,
  foto: String,
  expedicion: { type: Date, default: Date.now() },
  products: [{ type: Schema.Types.ObjectId, ref: "Product"}]

})

module.exports = mongoose.model('Ticket', TicketSchema)