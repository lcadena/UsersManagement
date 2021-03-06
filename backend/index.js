'use strict'
var socket = require('socket.io')
//var express = require('express');
//var app = express();
//var server = require('http').Server(app);
//var io = require('socket.io')(server);

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')
let server;
var send = []

mongoose.connect(config.db, (err, res) => {
  if (err) {return console.log(`Error al conectar a la base de datos: ${err}`)}
  console.log('Conexión a la base de datos establecida...')
  server = app.listen(config.port, (err, res) => {
    console.log(`API REST corriendo en http://localhost:${config.port}`)
  })

  //SOCKETS//

  //conexion de los socket
  var io = socket(server);
  io.on('connection', function(socket){
    console.log("conexion del ususario con el SOCKET:  ", socket.id);   
      
    //recibo/envio a todos que me en conectado
    socket.on('user', function(nickname){ //escucho que los socket que se conecten 
      socket.nickname = nickname;   
      console.log("recibo la conexion de un cliente", socket.nickname)
      var allConnectedClients = io.sockets.connected; //list os socket connectados
      send =[];
      Object.keys(allConnectedClients).forEach(function(key){
        send = send + allConnectedClients[key]["id"]+ "+" + allConnectedClients[key]["nickname"] + ",";              
     
      })  
    io.sockets.emit('envio', send )//envio que me he conectado
    console.log("envio de la conexion ", send);
    });
    
    //desconexion de los 
    
    socket.on('dis', function(email){//escucho cuando se desconecta
      console.log("Desconexion de un ciente", socket.id)
      socket.disconnect()
      var allConnectedClients = io.sockets.connected; //list os socket connectados
      send =[];
      Object.keys(allConnectedClients).forEach(function(key){
        send = send + allConnectedClients[key]["id"]+ "+" + allConnectedClients[key]["nickname"] + ",";              
     
      })  
    io.sockets.emit('envio', send )//envio que me he conectado    
     console.log("desconexion de  ", send);
     
    });

    //escucho los mensajes que me llegan del chay
    socket.on('chat', function( email, dest,  message){
      let mensaje =  email + ":  " + message;
      io.sockets.emit('chat', mensaje, dest);
      console.log("emitido y escuchado  " , mensaje)
    })
  })
})