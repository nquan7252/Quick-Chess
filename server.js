const path=require('path');
const http=require('http');
const express=require("express");
const socketio=require('socket.io');
var isWhite=true;
var whiteConnected=false;
var blackConnected=false;
const app=express();
const server=http.createServer(app);
const io=socketio(server);
app.use(express.static(path.join(__dirname,'public')));
io.on('connection',socket =>{
    if (isWhite){
        console.log("White player connected");
        isWhite=!isWhite;
        whiteConnected=true;
        io.emit('playerConnect',"white");
    }
    else{ 
        console.log("Black player connected");
        blackConnected=true;
        isWhite=!isWhite;
        io.emit("playerConnect","black")
    }

   socket.on("move",(chosenPieceName,chosenPieceColor,oldposition,newposition,src)=>{
       io.emit("updatemove",chosenPieceName,chosenPieceColor,oldposition,newposition,src);
   })

})
server.listen(8888,()=>console.log("running on 8888")); 