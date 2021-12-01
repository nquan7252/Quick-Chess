
 var socket=io.connect();

function showForm(){
    document.getElementById("container").innerHTML="";
    document.getElementById("form").style.visibility="visible";
    const joinroom=document.getElementById("form");
    joinroom.addEventListener('submit',submitfn);
}
function createServer(){
    
    const rand = Math.random().toString().substr(2, 8);
    socket.emit('join',rand);
    console.log(rand);
    url="room.html"+"?id="+rand;
    window.open(url,"_self");
    
}

function submitfn(e){
    /*
    e.preventDefault();
    const roomid=e.target.elements.roomid.value;
    console.log(roomid);
    //socket.emit('checkRoomExist',roomid);
    url="room.html"+"?id="+roomid;
    socket.emit(roomid);
    window.open(url,'_self');
*/



e.preventDefault();
const roomid=e.target.elements.roomid.value;
   
    socket.emit("checkRoom",roomid);
    
    socket.on("validRoom",()=>{
        url="room.html"+"?id="+roomid;
        window.open(url,"_self");
        socket.emit('readyToPlay',roomid);
        socket.emit('join',roomid);
    })
    socket.on('roomFull',()=>{
        alert('Room is full');
    })
    socket.on('error',()=>{
        alert('Room does not exist');
    })
}

    /*
    socket.on("roomExist",(value)=>{
        if (value=="yes") {
            socket.emit('join',roomid);
            window.open(url,'_self');
        }
        else alert("Room does not exist");
    })
}
*/
