'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const Product = require('../models/product')
const Ticket = require('../models/ticket')
const Tienda = require('../models/tienda')
const service = require('../services')

function saveTienda(req, res) {
    console.log('POST /api/tienda')
    //imprime cuerpo de petición
    console.log(req.body)
  
    //creo variable tienda
    let tienda = new Tienda()
    tienda.name = req.body.name
    tienda.direccion = req.body.direccion
    //tienda.listaProductos = req.body.listaProductos, No inicialitzem l'array?
    tienda.save((err, tiendaStored) => {
        if (err) res.status(500).send({message: `Error al salvar en la bbdd: ${err}`})
        res.status(200).send(tiendaStored)
      })
  }

//función listar tiendas
function getTiendas(req, res) {
    Tienda.find({}, (err, tiendas) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!tiendas) return res.status(404).send({message: 'No existen tiendas en la bbdd'})
      console.log(tiendas)
      res.status(200).send(tiendas)
    })
}

//Modificar tienda
function updateTienda(req, res) {
    let tiendaId = req.params.tiendaId
    let update = req.body

    Tienda.findByIdAndUpdate(tiendaId, update, (err, tiendaUpdated) => {
        if (err) res.status(500).send({message: `Error al actualizarlo: ${err}`})
    
        res.status(200).send(tiendaUpdated)
    })
}

//Añadir producto a un tienda
function addProductToTienda(req, res) {
    let tiendaId = req.params.tiendaId
    let productId = req.params.productId

    Tienda.update({_id: tiendaId}, {"$push": {"listaProductos": productId}}, (err, result) => {
      if (err) res.status(500).send({message: `Error al actualizar la tienda: ${err}`})
      if (!result) return res.status(404).send({message: 'La tienda no existe'})
  
      res.status(200).send(result)
      })
}

//listar productos de una tienda
function getProductsofTienda(req, res) {
    let tiendaId = req.params.tiendaId
    Tienda.findById({_id: tiendaId}, (err, result)  => {
      console.log(result.products)
      if(err) return res.status(500).send(`Error al realizar la petición: ${err}`)
      if(!result) return res.status(400).send({message: 'La tienda no existe'})
  
      Product.find({'_id': { $in: result.products}}, (err, productsOfTienda) => {
        if(productsOfTienda.length == 0) {
          return res.status(404).send({message: 'La tienda no tiene Productos'})
        } else {
          console.log(productsOfTienda)
          return res.status(200).send(productsOfTienda)
        }
      })
    })
}

//eliminar producto
function deleteTienda (req, res) {
    let alarmaId = req.params.alarmaId

    tienda.findById(alarmaId, (err, alarma) => {
        if (err) res.status(500).send({message: `Error al eliminarla: ${err}`})
    
        alarma.remove(err => {
            if (err) res.status(500).send({message: `Error al eliminarla: ${err}`})
            
            res.status(200).send({message: `tienda eliminada`})
        })
    })
}



module.exports = {
    saveTienda,
    getTiendas,
    updateTienda,
    addProductToTienda,
    getProductsofTienda,
    deleteTienda
}



