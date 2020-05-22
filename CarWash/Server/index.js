var Express = require('express'), 
    app = Express(),
    Server = require('http').Server(app),
    IO = require('socket.io')(Server),
    MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017',
    dbName = 'ChatSRP';


IO.on('connection', function (socket) {
   console.log("El cliente con IP: " + socket.handshake.address+ " se ha conectado...");
    console.log(sessionStorage.getItem('nombre'));
    

   MongoClient.connect(url, function (err, client) {
    const db = client.db(dbName);

    db.collection(`'chat'`).find({}).toArray(function (err,msg) {
        socket.emit('messages', msg);
    });

    });

   socket.on('add-message', function (data) {
    
    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
 
        db.collection('chat').insert(data);
        db.collection('chat').find({}).toArray(function (err,msg) {
            socket.emit('messages', msg);
        });
 
     });
    

   });
    
});

Server.listen(6677, function () {
    console.log("Servidor esta funcionando en http://localhost:6677");
    
});
