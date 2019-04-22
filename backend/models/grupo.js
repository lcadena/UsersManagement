'use strict'

//importar mongoose
const mongoose = require('mongoose')
//esquema de mongoose
const Schema = mongoose.Schema

//crea los campos del esquema del producto
const GrupoSchema = Schema({
  name: String,
  //description: String,
  //lista usuarios
  usuarios: { type: Schema.Types.ObjectId, ref: "User"},
  //lista tickets
  listaTickets: { type: Schema.Types.ObjectId, ref: "Ticket"}

})

module.exports = mongoose.model('Grupo', GrupoSchema)