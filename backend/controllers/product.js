'use strict'
const mongoose = require('mongoose')
const Product = require('../models/product')
const service = require('../services')

/*"Url a la que queremos que escuche este método,
Devuelve un callback con las dos variables petición y respuesta */
function getProducts (req, res) {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({message: `Error al realizar la petición: ${err} `})
        if (!products) return res.status(404).send({message: 'No existen productos'})
       
        //Finalizar petición y comprobar que funciona
        return res.status(200).send({products})
        //res.send(200, { products })
    })
}
//obtener prducto
function getProduct (req,res) {
    let productId = req.params.productId
    
    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({message: `Error al realizar la petición: ${err} `})
        if (!product) return res.status(404).send({message: `El producto no existe`})
  
        return res.status(200).send({ product })
    })
}
//modificar - actualizar un  producto
function saveProduct (req, res) {
    console.log('POST /api/product')
    console.log(req.body) //Mostrar el cuerpo (body)

    let product = new Product()
    product.name = req.body.name
    product.picture = ""
    product.price = req.body.price
    product.category = req.body.category
    product.garantia = null
    product.devolucion = null
    product.description = req.body.description

    product.save((err, productStored) => {
        if (err) res.status(500).send({message: `Error al salvar en la BBDD: ${err}`})    
        res.status(200).send(productStored)
    })
}
//añadir un producto a la base de datos
function updateProduct (req, res) {
    let productId = req.params.productId
    let update = req.body

    Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if (err) res.status(500).send({message: `Error al actualizarlo: ${err}`})
    
        res.status(200).send({product: productUpdated})
    })
}
//eliminar producto
function deleteProduct (req, res) {
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if (err) res.status(500).send({message: `Error al eliminarlo: ${err}`})
    
        product.remove(err => {
            if (err) res.status(500).send({message: `Error al eliminarlo: ${err}`})
            
            res.status(200).send({message: `Producto eliminado`})
        })
    })
}
module.exports = {
    getProducts,
    getProduct,
    saveProduct,
    updateProduct,
    deleteProduct
}
