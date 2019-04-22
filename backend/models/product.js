'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

//Crear esquema producto
const ProductSchema = Schema({
    name: String,
    category: {type: String, enum: ['computers', 'phones', 'accessories']},
    lugar:  String,
    price: { type: Number, default:0 },
    garantia: { type: Date, default: Date.now() },
    devolucion: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('Product', ProductSchema)