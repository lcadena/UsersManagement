'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config =require('../config')

//funcion que crea token con el objeto usuario
function createToken(user) {
    const payload = {
      sub: user._id,
      ///libreria moment para las fechas, ayuda para el manejo de fechas
      iat: moment().unix(), //fecha en la que fue creado el Token-tiempo en formato unix
      exp:moment().add(14, 'days').unix(), //fecha en la que el token va a expirar - caduca en 14 días
    }
  
    //codificarlo
    return jwt.encode(payload, config.SECRET_TOKEN)
  }


function decodeToken(token) {
  //uso de promesas de forma nativa, dentro del propio lenguaje
  //promesa la cual si se resuelve tendrá el token decodificado, sino mensaje de error
  const decoded = new Promise((resolve, reject) => {
    try {
      //decodificación del token --objeto payload decodificado
      const payload = jwt.decode(token, config.SECRET_TOKEN)
      //comprobación caducidad del token
      if (payload.exp <= moment().unix()) {
        //llamamos a reject y le pasamos un objeto, reject para que entre dentro del catch de la promesa
        reject({
          status: 401,
          message: 'El token ha expirado'
        })
      }
      //payload.sub es el id del usuario
      resolve(payload.sub)

    } catch (err) {
      //manda un objeto como propiedad
      reject({
        status: 500,
        message: 'Invalid Token'
      })
    }
  })

  return decoded
}



module.exports = {
  createToken,
  decodeToken
}