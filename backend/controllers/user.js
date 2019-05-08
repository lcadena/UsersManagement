'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const Product = require('../models/product')
const Ticket = require('../models/ticket')
const Tiendas = require('../models/tienda')
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
//listar los usuarios 
function getUsers(req, res) {
  //busca todos los usuarios, claudator vacio
  User.find({}, {products:0}, (err, userslist) => { //l'array de productes no m'ho dona
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!userslist) return res.status(404).send({message: 'No existen usuarios en la bbdd'})
    //se envia una respuesta en res, la respuesta sera un json de producto
    console.log(userslist)
    //res.send(200, { userList })
    return res.status(200).send(userslist)
  })
}
//modificar un usuario 
function updateUser(req, res) {
  //obtener el id de 
  let userId = req.params.userId
  //parametros a actualizar estan en el body de la req
  let update = req.body
  //funcion de mongoose le pasamos el id de producto y los parametros que queremos modificar
  User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
    if (err) res.status(500).send({message: `Error al actualizar el usuario: ${err}`})
    if (!userUpdated) return res.status(404).send({message: 'El usuario no existe'})

    return res.status(200).send(userUpdated)
  })
}
//listar l ainfo de un solo usuario
function getSingleUser(req, res) {
  //obtener el id de usuario
  let userId = req.params.userId // coge de un parametro el id? (por ejemplo si yo le paso el mail me devuelve el id?)
  User.findById(userId, (err, user) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!user) return res.status(404).send({message: 'El usuario no existe'})

    return res.status(200).send(user)
  })
}
//eliminar un usuario 
function deleteUser(req, res) {
  let userId = req.params.userId

  User.findById(userId, (err, product) => {
    if (err) res.status(500).send({message: `Error al borrar el usuario: ${err}`})

    product.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar el usuario: ${err}`})
      return res.status(200).send('El usuario ha sido eliminado')
    })
  })
}
//recoger los usuarios y los productos de cada usuario
function getUserswithProducts(req, res) {
  //busca todos los usuarios, claudator vacio
  User.find({ }, (err, userslistwithproducts) => { //l'array de productes no m'ho dona
    Product.populate(userslistwithproducts, {path: "product"}, (err, userslistwithproducts) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!userslistwithproducts) return res.status(404).send({message: 'No existen usuarios en la bbdd'})
      //se envia una respuesta en res, la respuesta sera un json de producto
      console.log(userslistwithproducts)
      return res.status(200).send(userslistwithproducts)

    })
  })
}
///añadir producto a usario
function addProductToUser(req, res) {
  let userId = req.params.userId
  let productId = req.params.productId
  //let update = req.body
  User.update({_id: userId}, {"$push": {"products": productId}}, (err, result) => {
    if (err) res.status(500).send({message: `Error al actualizar el usuario: ${err}`})
    if (!result) return res.status(404).send({message: 'El usuario no existe'})
    console.log(result)
    return res.status(200).send(result)
    })
}
///añadir tienda a usario
function addTiendaToUser(req, res) {
  let userId = req.params.userId
  let tiendaId = req.params.tiendaId
  //let update = req.body
  User.update({_id: userId}, {"$push": {"tiendas": tiendaId}}, (err, result) => {
    if (err) res.status(500).send({message: `Error al actualizar el usuario: ${err}`})
    if (!result) return res.status(404).send({message: 'El usuario no existe'})
    console.log(result)
    return res.status(200).send(result)
    })
}
//añadir ticket a usuario
function addTicketToUser(req, res) {
  let userId = req.params.userId
  let ticketId = req.params.ticketId
  User.update({_id: userId}, {"$push": {"tickets": ticketId}}, (err, result) => {
    if(err) return res.status(500).send({message: `Error al actualizar el usaurio: ${err}`})
    if(!result) return res.status(404).send({message: 'El usuario no existe'})
    console.log(result)
    return res.status(200).send(result)
  })
}
///listar productos de un usuario 
function getProductsofUser(req, res) {
  let userId = req.params.userId
  User.findById({_id: userId}, (err, result)  => {
    console.log(result.products)
    if(err) return res.status(500).send(`Error al relizar petición: ${err}`)
    if(!result) return res.status(400).send({message: 'El usuario no existe'})

    Product.find({'_id': { $in: result.products}}, (err, productsOfUser) => {
      if(productsOfUser.length == 0) {
        return res.status(204).send({message: 'El usuario no tiene productos'})
      } else {
        console.log(productsOfUser)
        return res.status(200).send(productsOfUser)
      }
    })
  })
}
//listar tickets de un usuario 
function getTicketsofUser(req, res) {
  let userId = req.params.userId
  User.findById({_id: userId}, (err, result) => {
    console.log(result.tickets)
    if(err) return res.status(500).send(`Error al realizar la petición: ${err}`)
    if(!result) return res.status(400).send({message: 'El usuario no existe'})

    Ticket.find({'_id': { $in: result.tickets}}, (err, ticketsOfUser) => {
      if(ticketsOfUser.length == 0) {
        return res.status(204).send({message: 'El usaurio no tiene tickets'})
      } else {
        console.log(ticketsOfUser)
        return res.status(200).send(ticketsOfUser)
      }
    })
  })
}
//listar tiendas por usuario
function getTiendasofUser(req, res) {
  let userId = req.params.userId
  User.findById({_id: userId}, (err, result) => {
    console.log(result.tiendas)
    if(err) return res.status(500).send(`Error al realizar la petición: ${err}`)
    if(!result) return res.status(400).send({message: 'El usuario no existe'})

    Tiendas.find({'_id': { $in: result.tiendas}}, (err, tiendasOfUser) => {
      if(tiendasOfUser.length == 0) {
        return res.status(204).send({message: 'El usaurio no tiene tiendas'})
      } else {
        console.log(tiendasOfUser)
        return res.status(200).send(tiendasOfUser)
      }
    })
  })
}





module.exports = {
  signUp,
  signIn,
  getUsers,
  updateUser,
  getUser: getSingleUser,
  deleteUser,
  getUserswithProducts,
  addProductToUser,
  addTiendaToUser,
  addTicketToUser,
  getProductsofUser,
  getTicketsofUser, 
  getTiendasofUser
}