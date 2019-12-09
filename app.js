const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser =require("body-parser");
const cors= require('cors');

app.use(cors())
app.use(bodyParser.json())
app.get('/', function(req, res) {
   res.json({hello:"world"});
});

users = [];
  
latAndLanData=[]
app.get('/users',function(req,res){
   res.json(users)
})
io.on('connection', function(socket) {
   console.log('A user connected');
   socket.on('setUsername', function(data) {
     console.log(data)
        //  socket.emit('userSet', {username: data});
        users.push(data)
        
     }
   )
   socket.on('msg', function(data) {
    //Send message to everyone

    console.log(data)  
    io.sockets.emit('newmsg'+data.user+data.oPhno, data);
    io.sockets.emit( 'newmsg'+data.oPhno+data.user , data);
    
 })
 socket.on('maps',function(data){
    console.log(data)
    var j=0
    if(latAndLanData.length==0){
      latAndLanData.push(data)
    }
    else{
      for(var i=0;i<latAndLanData.length;i++){
         console.log(data.phno)
         if(latAndLanData[i].phno===data.phno){
           latAndLanData[i].lat=data.lat
           latAndLanData[i].long=data.long
          j=j+1
         }
    }
    if(j==0){
      latAndLanData.push(data)
    }
       }    
       console.log(latAndLanData)
       io.sockets.emit('maplocation',latAndLanData);
 })  
});

http.listen(4000, function() {
   console.log('listening on localhost:3000');
});