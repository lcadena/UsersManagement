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
  //booleano para administrador
  rol: {type: String, enum: ['admin', 'user']}
  
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

UserSchema.methods.gravatar = function() {
  if(!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`
  //hash que por defecto pone gravatar en la url de nuestros avatares
  const md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', UserSchema)