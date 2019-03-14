'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')

//función para el registro
function signUp(req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    apellido: req.body.apellido,
    password: req.body.password,
    admin: req.body.admin,
  })
  user.save((err) => {
    if (err) res.status(500).send({message: `Error al crear el usuario: ${err}`})
    //respuesta con estado 200 y mensaje que contiene un parametro token, creamos modulo a parte
    //llamado service que tienen funcion crearToken la cual va a recibir el usuario que hemos creado
    return res.status(200).send({ token: service.createToken(user) })
  })
}

/*buscar en la base de datos los usuarios que tengan el email que se pasa por la petición
y si existe se da acceso creando un token que viajará en las cabeceras*/
function signIn(req, res) {
  User.find({email: req.body.email}, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if (!user) return res.status(404).send({ message: 'No existe el usaurio'})

    req.user = user
    res.status(200).send({
      message: 'Te has logueado correctamente',
      token: service.createToken(user) //envia el token al cliente
    })
  })
}

//función que busca en bbdd un objeto de tipo user
function getUsers(req, res) {
  //busca todos los productos, claudator vacio
  User.find({}, (err, users) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!users) return res.status(404).send({message: 'No existen usuarios en la bbdd'})
    //se envia una respuesta en res, la respuesta sera un json de producto
    res.send(200, { users })
  })
}

//función que actualiza usuario de la bbdd
function updateUser(req, res) {
  //obtener el id de producto
  let userId = req.params.userId
  //parametros a actualizar estan en el body de la req
  let update = req.body
  //funcion de mongoose le pasamos el id de producto y los parametros que queremos modificar
  User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
    if (err) res.status(500).send({message: `Error al actualizar el usario: ${err}`})

    res.status(200).send({user: userUpdated})
  })
}
//peticion tipo get - funcion que muestra todos los productos de la bbdd
function getUser(req, res) {
  //obtener el id de producto
  let userId = req.params.userId
  User.findById(userId, (err, user) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!user) return res.status(404).send({message: 'El usuario no existe'})

    res.status(200).send({user: user})
  })
}

module.exports = {
  signUp,
  signIn,
  getUsers,
  updateUser,
  getUser
}