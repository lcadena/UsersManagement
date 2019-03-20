/*crear un middleware para que proteja ciertas rutas de la API REST
determinadas rutas van a ser accesibles por usuarios y otras no si no esta autenticado*/
'use strict'

const services = require('../services')
const User = require('../models/user')

//funcion autenticacion - al ser middleware añadimos next para que el middleware pase
//la funcionalidad al controlador final
function isAuth(req, res, next){
  console.log(req)
  //comprobar si en el objeto headers de la petición existe campo autorization
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'No tienes autorización'})
  }
  //si existe cabecera
  //variable token que va a coger el token de las cabeceras y nos quedamos con la posición 1
  const token = req.headers.authorization.split(" ")[1]
  //llamamos al service y le pasamos el token
  services.decodeToken(token)
  //como es una promesa va a tener unas funciones
    .then(response => { //respuesta
      console.log(response)
      req.user = response
      next()
    })
    .catch(response => { //excepción
      res.status(response.status)
    })
}


module.exports = isAuth