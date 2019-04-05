'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')

//función para el registro
function signUp(req, res) {
  console.log("SIGNUP");
  var email = req.body.email
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    //rol: req.body.rol
  });

  //Guarda el usuario en la bbdd
      console.log("no hay usuario");
      user.save((err, userSaved) => {
        console.log(userSaved)
        if (err) res.status(500).send({message: `Error al crear el usuario: ${err}`})
        return res.status(200).send({
          message: "Usuario registrado",
          user: userSaved,
          token: service.createToken(user)
        })
      })
}

//función loguin
function signIn(req, res) {
  User.find({email: req.body.email}, (err, user) => {
    console.log(!user)
    console.log(user)
    if (err) return res.status(500).send({message: err})
    if (user.length === 0) return res.status(404).send('No existe el usuario')



    res.user = user
    res.status(200).send({
      message: 'Te has logueado correctamente',
      token: service.createToken(user)
    })
  })
}

/*User.findOne({email: email}, function (err, userEncontrado) {
    console.log(email)
    console.log(user)
    if (err) {
      next(err);
    }
    if (!userEncontrado) {
      console.log("no hay usuario");
      user.save((err, userSaved) => {
        console.log(userSaved)
        if (err) res.status(500).send({message: `Error al crear el usuario: ${err}`})
        return res.status(200).send({
          message: "Usuario registrado",
          user: userSaved,
          token: service.createToken(user)
        })
      })
    } else {
      return res.status(404).send("Usuario existente")
    }

  })*/
/*user.save((err) => {
  if (err) res.status(500).send({message: `Error al crear el usuario: ${err}`})

  return res.status(200).send({
    message: "Te has registrado correctamente",
    token: service.createToken(user)
  })
})
}*/

/*function signIn(req, res) {
 var email = req.body.email
 var password = req.body.password
 User.findOne({email: email, password: password}, function(err, user) {
   console.log(user)
   if (err) {
     next(err);
   }
   if (!user) {
     return res.status(404).send("No existe este usuario/contraseña incorrecta")
   }
   return res.status(200).send({
     message: 'Te has logueado correctamente',
     token: service.createToken(user) //envia el token al cliente
   })
 })
}*/

function getUsers(req, res) {
  //busca todos los usuarios, claudator vacio
  User.find({}, {products:0}, (err, userslist) => { //l'array de productes no m'ho dona
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!userslist) return res.status(404).send({message: 'No existen usuarios en la bbdd'})
    //se envia una respuesta en res, la respuesta sera un json de producto
    console.log(userslist)
    //res.send(200, { userList })
    res.status(200).send(userslist)
  })
}

function updateUser(req, res) {
  //obtener el id de 
  let userId = req.params.userId
  //parametros a actualizar estan en el body de la req
  let update = req.body
  //funcion de mongoose le pasamos el id de producto y los parametros que queremos modificar
  User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
    if (err) res.status(500).send({message: `Error al actualizar el usuario: ${err}`})
    if (!user) return res.status(404).send({message: 'El usuario no existe'})

    res.status(200).send({userUpdated})
  })
}

function getSingleUser(req, res) {
  //obtener el id de usuario
  let userId = req.params.userId // coge de un parametro el id? (por ejemplo si yo le paso el mail me devuelve el id?)
  User.findById(userId, (err, user) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!user) return res.status(404).send({message: 'El usuario no existe'})

    res.status(200).send({user})
  })
}

function deleteUser(req, res) {
  let userId = req.params.userId

  User.findById(userId, (err, product) => {
    if (err) res.status(500).send({message: `Error al borrar el usuario: ${err}`})

    product.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar el usuario: ${err}`})
      res.status(200).send('El usuario ha sido eliminado')
    })
  })
}

module.exports = {
  signUp,
  signIn,
  getUsers,
  updateUser,
  getUser: getSingleUser,
  deleteUser
}