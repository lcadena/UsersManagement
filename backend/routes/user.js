'use strict'

const express = require('express')
const userCtrl = require('../controllers/user')
const api_user = express.Router()
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

//listar usuarios en la bbdd
api_user.get('/user', userCtrl.getUsers)
//busqueda de usuario por id 
api_user.get('/user/:userId', userCtrl.getUser)
//registro
api_user.post('/signup', userCtrl.signUp)
//loguin
api_user.post('/signin', userCtrl.signIn)
//modificar info user
api_user.put('/user/:userId', userCtrl.updateUser)
//borrar usuario por id
api_user.delete('/user/:userId', userCtrl.deleteUser)
//ruta privada para la autentificación
api_user.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'Tienes acceso'})
})

module.exports = api_user