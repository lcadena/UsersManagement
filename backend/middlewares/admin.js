'use strict'

const User = require('../models/user')

function isAdmin(req, res, next) {
    var rol = req.params.userRol
  
    User.indexOf(userRol, (err, user) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!user) return res.status(404).send({message: 'No tienes autorización'})
  
      res.status(200).send({user})
    })
  
  
  }
  
  module.exports = isAdmin