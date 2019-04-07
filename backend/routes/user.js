'use strict'

const express = require('express')
const userCtrl = require('../controllers/user')
const productCtrl = require('../controllers/product')
const api = express.Router()
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')


//registro
api.post('/signup', userCtrl.signUp)
//loguin
api.post('/signin', userCtrl.signIn)

//listar usuarios en la bbdd
api.get('/user', userCtrl.getUsers)
//busqueda de usuario por id 
api.get('/user/:userId', userCtrl.getUser)
//modificar info user
api.put('/user/:userId', userCtrl.updateUser)
//borrar usuario por id
api.delete('/user/:userId', userCtrl.deleteUser)
//ruta privada para la autentificación
api.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'Tienes acceso'})
})
///rutas usuarios con productos
api.get('/usersList', userCtrl.getUserswithProducts)
api.put('/:userId/products/:productId', userCtrl.addProductToUser)
api.get('/userId/products/productId', userCtrl.getProductsofUser)

//listar productos en la bbdd
api.get('/product', auth, productCtrl.getProducts)
//busqueda de producto por id
api.get('/product/:productId', auth, productCtrl.getProduct)
//crear/añadir un producto
api.post('/product', auth, productCtrl.saveProduct)
//modificar info product
api.put('/product/:productId', auth, productCtrl.updateProduct)
//eliminar producto por id
api.delete('/product/:productId', auth, productCtrl.deleteProduct)

module.exports = api