const path=require('path');
const http=require('http');
const express=require("express");
const socketio=require('socket.io');
const { connect } = require('http2');
var secondConnection=true;
var isWhite=true;
var whiteConnected=false;
var blackConnected=false;
const app=express();
var connectCounter=0;
const server=http.createServer(app);
const io=socketio(server);
app.use(express.static(path.join(__dirname,'public')));
const PORT=process.env.PORT||8888;
io.on('connection',socket =>{
    socket.on("checkFor2nd",data=>{
        console.log('check called');
        try{
        if (io.sockets.adapter.rooms.get(data.roomid).size==2){
            io.to(socket.id).emit("checkForSecondTrue");
        console.log("this is the 2nd user")
        console.log("2nd user id:"+data.userid);
        }
        else{
            console.log("this is the first user")
            console.log("1st user id:"+data.userid);

           io.to(socket.id).emit("checkForFirstTrue");
        }
    }
    catch(e){
        console.log('error');
        socket.emit('error');
    }
    })
 
    
    socket.on("userLeft",(roomid)=>{
        console.log('a user has left')
        io.to(roomid).emit("leaveMessage");
    })
    socket.on("synchronize",(data)=>{
        console.log('synchronize called')
        io.in(data.id).emit('synchronizeDone',data.turn);
    })
   socket.on("join",roomid=>{
       console.log(roomid+" created");
       socket.join(roomid);
       console.log(io.sockets.adapter.rooms.get(roomid).size);
   })
   socket.on('checkRoom',roomid=>{
       try{
       if (io.sockets.adapter.rooms.get(roomid).size>0&&io.sockets.adapter.rooms.get(roomid).size<=1){
           socket.emit('validRoom');
       }
       else socket.emit('roomFull');
    }
    catch(e){
        console.log(e);
        socket.emit('error');
    }
   })
    socket.on("move",(data)=>{
        console.log("move received");
        io.in(data.id).emit("updatemove",{cpn: data.cpn,cpc: data.cpc,cp:data.cp,b:data.b,cps:data.cps});
       })
    socket.on("nextTurn",(roomid)=>{
        socket.broadcast.to(roomid).emit("nextTurn");
    })
    socket.on("updateTurn",(data)=>{
        socket.to(data.id).emit("updateTurn",data.value);
    })
    socket.on("havewinner",(data)=>{
        io.in(data).emit("gameover");
    })
    socket.on("checkwinner",data=>{
        io.in(data).emit("checkwinnerResponse");
    })
   // socket.on("readyToPlay",roomid=>{
     //   console.log('ready')
     //   io.in(roomid).emit("readyToPlayResponse");
  //  })
    socket.on("checkRoomExist",roomid=>{
        console.log('check called');
        if(checkRoom(roomid)){
            console.log("roomexist")
            socket.emit("roomExist","yes");
        }
        else{
            console.log(roomid)
        console.log("room not exist")
        socket.emit("roomExist","no");}
    
});
socket.on('isReady',roomid=>{
    console.log('isready called')
    try{
        if (io.sockets.adapter.rooms.get(roomid).size==2){
            io.in(roomid).emit('ready');
           // socket.broadcast.to(roomid).emit("checkFor2ndTrue")
        }
        else io.in(roomid).emit('notReady');
     }
     catch(e){
         socket.emit('error');
     }
})
    });
function checkRoom(roomid){
    if(io.sockets.adapter.rooms[roomid]){
        return true
    }
    return false;
}
server.listen(PORT,()=>console.log("running on 8888")); 
