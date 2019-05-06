'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

//Crear esquema producto
const ProductSchema = Schema({
    name: String,
    picture: String,
    price: { type: Number, default:0 },
    category: {type: String, enum: ['telefono', 'transporte', 'restaurante', 'compra', 'comida',
    'casa','deporte','higiene','taxi','salud','fiesta','vehiculo', 'phones', 'transportation', 'electronics']},
    garantia: { type: Date, default: Date.now() },
    devolucion: { type: Date, default: Date.now() },
    description: String
})

module.exports = mongoose.model('Product', ProductSchema)