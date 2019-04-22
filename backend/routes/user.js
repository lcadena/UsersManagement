'use strict'

const express = require('express')
const userCtrl = require('../controllers/user')
const productCtrl = require('../controllers/product')
const ticketCtrl = require('../controllers/ticket')
const api = express.Router()
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')


//registro - FUNCIONA
api.post('/signup', userCtrl.signUp)
//loguin - FUNCIONA
api.post('/signin', userCtrl.signIn)

/*USUARIOS: http://localhost:3000/api/user*/
//listar usuarios en la bbdd - FUNCIONA
api.get('/user', userCtrl.getUsers)
//busqueda de usuario por id - FUNCIONA
api.get('/user/:userId', userCtrl.getUser)
//modificar info user - FUNCIONA
api.put('/user/:userId', userCtrl.updateUser)
//borrar usuario por id - FUNCIONA
api.delete('/user/:userId', userCtrl.deleteUser)
//ruta privada para la autentificación
api.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'Tienes acceso'})
})

/*PRODUCTOS: http://localhost:3000/api/product*/
//listar productos en la bbdd - FUNCIONA
api.get('/product', productCtrl.getProducts)
//busqueda de producto por id - FUNCIONA
api.get('/product/:productId', productCtrl.getProduct)
//crear/añadir un producto - FUNCIONA
api.post('/product', productCtrl.saveProduct)
//modificar info product - FUNCIONA
api.put('/product/:productId', productCtrl.updateProduct)
//eliminar producto por id - FUNCIONA
api.delete('/product/:productId', productCtrl.deleteProduct)

/*PRODUCTOS Y USUARIOS*/
//listar todos los usuarios con productos - FUNCIONA
api.get('/usersproducts', userCtrl.getUserswithProducts)
//añadir un producto a un usuario - FUNCIONA
api.put('/:userId/products/:productId', userCtrl.addProductToUser)
//listar los productos de un usuario - FUNCIONA
api.get('/products/:userId', userCtrl.getProductsofUser)

/*TICKETS: http://localhost:3000/api/ticket*/
//listar productos en la bbdd - FUNICIONA
api.get('/tickets', ticketCtrl.getTickets)
//crear/añadir un producto - FUNCIONA
api.post('/ticket', ticketCtrl.saveTicket)
//modificar info product - FUNCIONA
api.put('/ticket/:ticketId', ticketCtrl.updateTicket)


/*TICKETS Y USUARIOS*/
//añadir un ticket a un usuario - FUNCIONA
api.put('/:userId/tickets/:ticketId', userCtrl.addTicketToUser)
//listar los tickets de un usuario - FUNCIONA
api.get('/tickets/:userId', userCtrl.getTicketsofUser)

/*TICKETS Y PRODUCTOS*/
//añadir un producto a un ticket - FUNCIONA
api.put('/:ticketId/prodtick/:productId', ticketCtrl.addProductToTicket)
//listar los productos de un ticket - FUNCIONA
api.get('/prodtick/:ticketId', ticketCtrl.getProductsofTicket)



module.exports = api