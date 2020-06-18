var Express = require('express'), 
    app = Express(),
    Server = require('http').Server(app),
    IO = require('socket.io')(Server),
    MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017',
    dbName = 'ChatCarWash';

const webpush = require('web-push');
const e = require('express');
const { error } = require('console');

const Keys = {
    PublicKey: "BBjDGDDZ_6hNxTr7gCW_9DLkWAg11ly-jFGnVIMXHEeMqiETcMkPJkNyHAjXcf7YArFI4aUWGigCMUMo1SCL0ks",
    PrivateKey: "zkXPQZ6ri8c3hM4_yBIG00kwfbWpw478z7h3UIRehb4"
}

webpush.setVapidDetails(
    "mailto:johanssonr638@gmail.com",
    Keys.PublicKey,
    Keys.PrivateKey
);

let pushSubscripton;

IO.on('connection', function (socket) {
   console.log("El cliente con IP: " + socket.handshake.address+ " se ha conectado...");


   MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);

        db.collection('chat').find({}).toArray(function (err,msg) {
            IO.sockets.emit('messages', msg);
            
        });

    });

   socket.on('add-message', function (data) {
    let message = data.text, usuario = data.nickname;


    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        
        db.collection('chat').insertOne(data);
        db.collection('chat').find({}).toArray(function (err,msg) {
            IO.sockets.emit('messages', msg);

            const payload = JSON.stringify({
                title: usuario,
                message
            });
            
            console.log(JSON.stringify(pushSubscripton));
            
            webpush.sendNotification(pushSubscripton, payload).catch(e => console.error(e));
            
        });
 
     });
    

   });

   socket.on('Suscribirse', function(data){
    pushSubscripton = data;
    console.log(pushSubscripton);
   })
    
});

Server.listen(6677, function () {
    console.log("Servidor esta funcionando en http://localhost:6677");
    
});
