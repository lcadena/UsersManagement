'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

//crear el esquema de usuario
const UserSchema = new Schema({
  //mail de tipo string, unico y estadarizado
  email: { type: String, unique: true, lowercase: true },
  displayName: String,
  apellido: String,
  /*select false seguridad con el cliente, cada vez que hago un get esta contraseña no se
  envía al cliente*/
  password: { type: String, select: false },
  //momento en el que se registra el usuario
  //booleano para administrador
  admin: {type: Boolean, default: false},
  singupDate: { type: Date, default: Date.now() },
  lastLogin: Date
})

/*funciones que se pueden ejecutar antes o despues de que el modelo se haya añadido a la bbdd
en este caso será antes para guardar la contraseña*/
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

/*libreria de web ce gravatar.com, te devuelve avatar a apartir de un email*/
UserSchema.methods.gravatar = function() {
  if(!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`
  //hash que por defecto pone gravatar en la url de nuestros avatares
  const md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', UserSchema)