/*objeto javascript que va a importar lo siguiente..fichero de configuración*/
module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB || 'mongodb://localhost:27017/heypeybbdd',
    //añadimos el secret Token
    SECRET_TOKEN: 'miclavedetokens'
}