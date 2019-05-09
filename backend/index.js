'use strict'
var socket = require('socket.io')

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

let server;


mongoose.connect(config.db, (err, res) => {
  if (err) {return console.log(`Error al conectar a la base de datos: ${err}`)}
  console.log('Conexión a la base de datos establecida...')
  server = app.listen(config.port, (err, res) => {
    console.log(`API REST corriendo en http://localhost:${config.port}`)
    //server = res;
  })
  //conexion de los socket
  var io = socket(server);
  io.on('connection', function(socket){
    console.log("conexion del ususario con el SOCKET:  ", socket.id)
    //recivo/envio a todos que me en conectado
    socket.on('conectado', function(email){ //escucho que los socket que se conecten 
      socket.nickname = email;
      var allConnectedClients = io.sockets.connected;
      Object.keys(allConnectedClients).forEach(function(key){
        var val = allConnectedClients[key]["id"]+"+"+allConnectedClients[key]["email"];
        send.push(val);
      })
      var send = []
      io.sockets.emit('conectado', send); //se lo envio a todos los socket conectados
      console.log("envio de la conexion ", send);  
    })
    //desconexion de los socket
    socket.on('disconnect', function(){//escucho cuando se desconecta
        var allConnectedClients = Object.keys(io.sockets.connected);
      io.sockets.emit('conectado', allConnectedClients); //emito a todos los usuarios la nueva lista de conectados
    })
  })
})





