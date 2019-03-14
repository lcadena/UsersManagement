'use strict'

const express = require('express')
const userCtrl = require('../controllers/user')
const api_user = express.Router()
const auth = require('../middlewares/auth')

//busquedas
api_user.get('/user', userCtrl.getUsers)
api_user.get('/user/:userId', userCtrl.getUser)
//loguin y registro
api_user.post('/signup', userCtrl.signUp)
api_user.post('/signin', auth, userCtrl.signIn)
//modificar info user
api_user.put('/user/:userId', userCtrl.updateUser)

module.exports = api_user