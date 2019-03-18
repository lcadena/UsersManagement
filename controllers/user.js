'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')

//función para el registro
function signUp(req, res) {
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    signUpDate: req.body.signUpDate,
    rol: req.body.rol,
  })
  user.save((err) => {
    if (err) res.status(500).send({message: `Error al crear el usuario: ${err}`})
    
    return res.status(200).send({ token: service.createToken(user) })
  })
}

function signIn(req, res) {
  User.find({email: req.body.email}, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if (!user) return res.status(404).send({ message: 'No existe el usuario'})

    req.user = user
    res.status(200).send({
      message: 'Te has logueado correctamente',
      token: service.createToken(user) //envia el token al cliente
    })
  })
}

function getUsers(req, res) {
  //busca todos los usuarios, claudator vacio
  User.find({}, (err, users) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!users) return res.status(404).send({message: 'No existen usuarios en la bbdd'})
    //se envia una respuesta en res, la respuesta sera un json de producto
    res.send(200, { users })
  })
}

function updateUser(req, res) {
  //obtener el id de producto
  let userId = req.params.userId
  //parametros a actualizar estan en el body de la req
  let update = req.body
  //funcion de mongoose le pasamos el id de producto y los parametros que queremos modificar
  User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
    if (err) res.status(500).send({message: `Error al actualizar el usuario: ${err}`})

    res.status(200).send({user: userUpdated})
  })
}

function getUser(req, res) {
  //obtener el id de usuario
  let userId = req.params.userId
  User.findById(userId, (err, user) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!user) return res.status(404).send({message: 'El usuario no existe'})

    res.status(200).send({user: user})
  })
}

function deleteUser(req, res) {
  let userId = req.params.userId

  User.findById(userId, (err, product) => {
    if (err) res.status(500).send({message: `Error al borrar el usuario: ${err}`})

    product.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar el usuario: ${err}`})
      res.status(200).send({message: 'El usuario ha sido eliminado'})
    })
  })
}

module.exports = {
  signUp,
  signIn,
  getUsers,
  updateUser,
  getUser,
  deleteUser
}