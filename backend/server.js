//connexion de socket 

var socket = require('socket.io');

const express = require('express')
const bodyParser = require('body-parser')
const cors = require ('cors')

const PORT = 3000
const api = require('./routes/api')
const app = express()

app.use('/api', api)
app.get('/', function(req, res){
    res.send('Hello from server')
})

//conexion del server
erver = app.listen(PORT, function(){
    console.log("Server running on localhost:" + PORT)
})
    //server parte de socket
    var io = socket(server);
    io.on('connection', function(socket){
        console.log("conexion del cliete con el socket: ". socket.id)
        socket.on('chat', function(mensaje,email){
            io.sockets.emit('chat', mensaje, email)
        })
    })