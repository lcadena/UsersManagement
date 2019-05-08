'use strict'

const services = require('../services')
const User = require('../models/user')

function isAdmin (req, res, next) {
  //comprobar si en el objeto headers de la petición existe campo autorization
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'No ha enviado el token de verificación'})
  }
  //si existe cabecera
  //variable token que va a coger el token de las cabeceras y nos quedamos con la posición 1
  const token = req.headers.authorization.split(" ")[1]
  //llamamos al service y le pasamos el token
  services.decodeToken(token)
  //como es una promesa va a tener unas funciones
    .then(response => { //respuesta
      ///buscar id usuario con token y ver el rol
      let userID = response
      console.log(response)
      User.findById(userID, (err, userEncontrado) => {
        console.log(userEncontrado)
        if (err) {
          return res.status(500).send({message: `Error en la petición: ${err}`})
        }
        if (userEncontrado) {
          var rol = userEncontrado.rol
          console.log(rol)
          if (rol == 'admin') {
            //res.status(200).send({message: "Eres administrador"})
            //req.user = response
            next()
          } 
          if (rol !== 'admin') {
            return res.status(404).send({message: 'No tienes permisos de administrador para realizar esta petición'})
          }
        } else {
          return res.status(500).send({message: `Error: ${err}`})
        }
      })
    })
    .catch(response => { //excepción
      res.status(response.status)
    })
  }


  
  module.exports = isAdmin