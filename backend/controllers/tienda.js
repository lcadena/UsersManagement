'use strict'

const Product = require('../models/product')
const Tienda = require('../models/tienda')
 // funcion de salva /add tienda
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
      res.status(200).send({tiendas})
    })
}

function getTiendaID(req,res){
  console.log("holllllliii get tiendaID");
  let tiendaId = req.params.tiendaId
Tienda.findById(tiendaId,(err, tienda) => {
  if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
  if (!tienda) return res.status(404).send({message: 'No existe la tiendas en la bbdd'})
  console.log("get una tienda",tienda)
  res.status(200).send(tienda)
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

//eliminar producto
function deleteTienda (req, res) {
  let tiendaId = req.params.tiendaId

  Tienda.findById(tiendaId, (err, tienda) => {
      if (err) res.status(500).send({message: `Error al eliminarla: ${err}`})
  
      tienda.remove(err => {
          if (err) res.status(500).send({message: `Error al eliminarla: ${err}`})
          
          res.status(200).send({message: `tienda eliminada`})
      })
  })
}

//Añadir producto a un tienda
function addProductToTienda(req, res) {
    let tiendaId = req.params.tiendaId
    let productId = req.params.productId

    Tienda.update({_id: tiendaId}, {"$push": {"products": productId}}, (err, result) => {
      if (err) res.status(500).send({message: `Error al actualizar la tienda: ${err}`})
      if (!result) return res.status(404).send({message: 'La tienda no existe'})
  
      res.status(200).send(result)
      })
}

//listar productos de una tienda
function getProductsofTienda(req, res) {
    let tiendaId = req.params.tiendaId
    Tienda.findById({_id: tiendaId}, (err, result)  => {
      if(err) return res.status(500).send(`Error al realizar la petición: ${err}`)
      if(!result) return res.status(404).send({message: 'La tienda no existe'})
  
      Product.find({'_id': { $in: result.products}}, (err, productsOfTienda) => {
        if(productsOfTienda.length == 0) {
          return res.status(404).send({message: 'La tienda no tiene productos'})
        } else {
          console.log(productsOfTienda)
          return res.status(200).send(productsOfTienda)
        }
      })
    })
}

module.exports = {
    saveTienda,
    getTiendas,
    getTiendaID,
    updateTienda,
    addProductToTienda,
    getProductsofTienda,
    deleteTienda
}



