'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

//crear el esquema de usuario
const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true, required: true },
  firstName: String,
  lastName: String,
  password: { type: String, select: false },
  signUpDate: { type: Date, default: Date.now() },
  rol: {type: String, enum: ['admin', 'user']},
  products:  [{ type: Schema.Types.ObjectId, ref: 'Products' }]
  
})

UserSchema.pre('save', (next) => {
  let user = this
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})


module.exports = mongoose.model('User', UserSchema)