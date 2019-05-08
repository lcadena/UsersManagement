'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')
var socket = require('socket.io')


mongoose.connect(config.db, (err, res) => {  
  if (err) { return console.log(`Error al conectar a la base de datos: ${err}`) }
  console.log('Conexión a la base de datos establecida...')
 app.listen(config.port, function() {
    console.log(`API REST corriendo en http://localhost:${config.port}`)
  })
  //socket setup para la conexion de cada cliente
 /* var io = socket(server);
  //server parte de socket
    io.on('connection', function(socket){
      console.log("conexion del cliete con el socket: ". socket.id)
        
       /* socket.on('chat', function(mensaje,email){
          io.sockets.emit('chat', mensaje, email)
        }) 
        
        //asigno u socket a un usario conectado
        socket.on('conect', function(email){
          socket.nickname = email;
          var allConnectedClients = io.sockets.connected; //list os socket connected
          var send = []
          Object.keys(allConnectedClients)[key]["id"]+"+"+allConnectedClients[key]["nickname"];
          send.push(val);
        });
        //socket emitido
        io.sockets.emit('conect',send);//send to connected socket
        console.log("socket conectadoc",send);
    })
    */
})




