'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const Alarma = require('../models/alarma')
//const Alarma = require('../models/Alarma')
const service = require('../services')

function saveAlarma(req, res) {
    console.log('POST /api/Alarma')
    //imprime cuerpo de petición
    console.log(req.body)
  
    //creo variable alarma
    let alarma = new Alarma()
    alarma.name = req.body.name
    alarma.description = req.body.description
    alarma.direccion = req.body.direccion
    //alarma.listaAlarma = req.body.listaAlarma, No inicialitzem l'array?
    alarma.save((err, alarmaStored) => {
        if (err) res.status(500).send({message: `Error al salvar en la bbdd: ${err}`})
    
        res.status(200).send({message: alarmaStored})
      })

    //salvar la alarma, cuando se almacena mongodb le añade un id unico
    alarma.save((err, alarmaStored) => {
      if (err) res.status(500).send({message: `Error al salvar en la bbdd: ${err}`})
  
      res.status(200).send({message: alarmaStored})
    })
  }

//función listar alarmas
function getAlarmas(req, res) {
    Alarma.find({}, (err, alarmas) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!alarmas) return res.status(404).send({message: 'No existen alarmas en la bbdd'})
      console.log(alarmas)
      res.status(200).send({alarmas})
    })
}

//Modificar alarma
function updateAlarma(req, res) {
    let alarmaId = req.params.alarmaId
    let update = req.body

    Alarma.findByIdAndUpdate(alarmaId, update, (err, alarmaUpdated) => {
        if (err) res.status(500).send({message: `Error al actualizarlo: ${err}`})
    
        res.status(200).send({alarmaUpdated})
    })
}

//eliminar alarma
function deleteAlarma (req, res) {
    let alarmaId = req.params.alarmaId

    Alarma.findById(alarmaId, (err, alarma) => {
        if (err) res.status(500).send({message: `Error al eliminarla: ${err}`})
    
        alarma.remove(err => {
            if (err) res.status(500).send({message: `Error al eliminarla: ${err}`})
            
            res.status(200).send({message: `Alarma eliminada`})
        })
    })
}

module.exports = {
    saveAlarma,
    getAlarmas,
    updateAlarma,
    deleteAlarma
}