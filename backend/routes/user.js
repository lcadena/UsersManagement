'use strict'

const express = require('express')
const userCtrl = require('../controllers/user')
const productCtrl = require('../controllers/product')
const ticketCtrl = require('../controllers/ticket')
const tiendaCtrl = require('../controllers/tienda')
const alarmaCtrl = require('../controllers/alarma')
const api = express.Router()
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')


//registro - FUNCIONA **
api.post('/signup', userCtrl.signUp)
//loguin - FUNCIONA **
api.post('/signin', userCtrl.signIn)

/*USUARIOS: http://localhost:3000/api/user*/

//listar usuarios en la bbdd - FUNCIONA**
api.get('/users', userCtrl.getUsers)
//busqueda de usuario por id - FUNCIONA
api.get('/user/:userId', userCtrl.getUser)
//modificar info user - FUNCIONA *
api.put('/user/:userId', userCtrl.updateUser)
//borrar usuario por id - FUNCIONA **
api.delete('/user/:userId', userCtrl.deleteUser)
//ruta privada para la autentificación
api.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'Tienes acceso'})
})

/*PRODUCTOS: http://localhost:3000/api/product*/
//listar productos en la bbdd - FUNCIONA **
api.get('/products', productCtrl.getProducts)
//busqueda de producto por id - FUNCIONA
api.get('/product/:productId', productCtrl.getProduct)
//crear/añadir un producto - FUNCIONA **
api.post('/product', productCtrl.saveProduct)
//modificar info product - FUNCIONA *
api.put('/product/:productId', productCtrl.updateProduct)
//eliminar producto por id - FUNCIONA **            
api.delete('/product/:productId', productCtrl.deleteProduct)

/*PRODUCTOS Y USUARIOS*/ 
//listar todos los usuarios con productos - FUNCIONA *
api.get('/usersproducts', userCtrl.getUserswithProducts)
//añadir un producto a un usuario - FUNCIONA *
api.put('/:userId/products/:productId', userCtrl.addProductToUser)
//listar los productos de un usuario - FUNCIONA **
api.get('/products/:userId', userCtrl.getProductsofUser)


/*TICKETS: http://localhost:3000/api/ticket*/
//listar tickets en la bbdd - FUNCIONA **
api.get('/tickets', ticketCtrl.getTickets)
//añadir un ticket - FUNCIONA **
api.post('/ticket', ticketCtrl.saveTicket)
//modificar info ticket - FUNCIONA *
api.put('/ticket/:ticketId', ticketCtrl.updateTicket)


/*TICKETS Y USUARIOS*/
//añadir un ticket a un usuario - FUNCIONA *
api.put('/:userId/tickets/:ticketId', userCtrl.addTicketToUser)
//listar los tickets de un usuario - FUNCIONA **
api.get('/tickets/:userId', userCtrl.getTicketsofUser)

/*TICKETS Y PRODUCTOS*/
//añadir un producto a un ticket - FUNCIONA *
api.put('/:ticketId/prodtick/:productId', ticketCtrl.addProductToTicket)
//listar los productos de un ticket - FUNCIONA **
api.get('/prodtick/:ticketId', ticketCtrl.getProductsofTicket)

/*TIENDAS: http://localhost:3000/api/tienda*/
//Añadir una tienda en la bbdd - FUNCIONA **
api.post('/tienda', tiendaCtrl.saveTienda) 
//listar todas las tiendas - FUNCIONA **
api.get('/tiendas', tiendaCtrl.getTiendas) 
//recoger los datos de la tienda por ID
api.get('/tiendaId/:tiendaId',tiendaCtrl.getTiendaID)
//modificar info tienda - FUNCIONA *
api.put('/tienda/:tiendaId', tiendaCtrl.updateTienda)
//eliminar tienda por id - FUNCIONA
api.delete('/tiendas/:tiendaId', tiendaCtrl.deleteTienda)

/*TIENDAS Y USUARIO:*/
//Añadir una tienda a un user - FUNCIONA *
api.put('/:userId/tiendauser/:tiendaId', userCtrl.addTiendaToUser)
//listar tiendas de un usuario
api.get('/tiendas/:userId', userCtrl.getTiendasofUser)


/*TIENDAS Y PRODUCTOS*/
//añadir un producto a una tienda - FUNCIONA
api.put('/:tiendaId/prodtienda/:productId', tiendaCtrl.addProductToTienda)
//listar los productos de una tienda - FUNCIONA
api.get('/prodtienda/:tiendaId', tiendaCtrl.getProductsofTienda)





/*ALARMAS: http://localhost:3000/api/alarma*/
//listar alarmas en la bbdd
api.get('/alarmas', alarmaCtrl.getAlarmas)
//crear/añadir una alarma
api.post('/alarma', alarmaCtrl.saveAlarma)
//modificar info alarma
api.put('/alarma/:alarmaId', alarmaCtrl.updateAlarma)
//eliminar alarma por id 
api.delete('/alarma/:alarmaId', alarmaCtrl.deleteAlarma)





module.exports = api