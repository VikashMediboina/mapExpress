const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
   res.json({hello:"world"});
});

users = [];
io.on('connection', function(socket) {
   console.log('A user connected');
   socket.on('setUsername', function(data) {
     console.log(data)
        //  socket.emit('userSet', {username: data});
     }
   )
   socket.on('msg', function(data) {
    //Send message to everyone
    console.log(data)
    io.sockets.emit('newmsg', data);
    
 })  
});

http.listen(4000, function() {
   console.log('listening on localhost:3000');
});