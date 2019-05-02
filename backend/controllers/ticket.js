'use strict'

const Ticket = require('../models/ticket')
const Product = require('../models/product')


//función para guardar/subir tickets
function saveTicket(req, res) {
    console.log('POST /api/ticket')
    //imprime cuerpo de petición
    console.log(req.body)
  
    //creo variable product
    let ticket = new Ticket()
    ticket.name = req.body.name
    ticket.cif = req.body.cif
    ticket.foto = req.body.foto
    //ticket.fechaExpedicion = req.body.fechaExpedicion
    //salvar el ticket, cuando se almacena mongodb le añade un id unico
    ticket.save((err, ticketStored) => {
      if (err) res.status(500).send({message: `Error al salvar en la bbdd: ${err}`})
  
      res.status(200).send( ticketStored)
    })
  }

  //función listar tickets
function getTickets(req, res) {
    Ticket.find({}, (err, tickets) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!tickets) return res.status(404).send({message: 'No existen tickets en la bbdd'})
      console.log(tickets)
      res.status(200).send({tickets})
    })
}

//Modificar ticket
function updateTicket(req, res) {
    let ticketId = req.params.ticketId
    let update = req.body

    console.log("uptateTicket", update);

    Ticket.findByIdAndUpdate(ticketId, update, (err, ticketUpdated) => {
        if (err) res.status(500).send({message: `Error al actualizarlo: ${err}`})
    
        res.status(200).send({ticketUpdated})
    })
}

//Añadir producto a un ticket
function addProductToTicket(req, res) {
    let ticketId = req.params.ticketId
    let productId = req.params.productId

    Ticket.update({_id: ticketId}, {"$push": {"products": productId}}, (err, result) => {
      if (err) res.status(500).send({message: `Error al actualizar el ticket: ${err}`})
      if (!result) return res.status(404).send({message: 'El ticket no existe'})
  
      res.status(200).send(result)
      })
}

//listar productos de un ticket
function getProductsofTicket(req, res) {
  let ticketId = req.params.ticketId
  Ticket.findById({_id: ticketId}, (err, result)  => {
    console.log(result.products)
    if(err) return res.status(500).send(`Error al realizar la petición: ${err}`)
    if(!result) return res.status(404).send({message: 'El ticket no existe'})

    Product.find({'_id': { $in: result.products}}, (err, productsOfTicket) => {
      if(productsOfTicket.length == 0) {
        return res.status(404).send({message: 'El ticket no tiene productos'})
      } else {
        console.log(productsOfTicket)
        return res.status(200).send(productsOfTicket)
      }
    })
  })
}

module.exports = {
    saveTicket,
    getTickets,
    updateTicket,
    addProductToTicket,
    getProductsofTicket
}