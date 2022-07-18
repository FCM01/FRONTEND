const express = require("express");
const cors = require('cors'); 

const app = express()
const http  = require('http').createServer(app)
const array_of_users  = []

const io  = require("socket.io")(http ,{
    cors:{
        orign: "*"
    }
})

app.get('/', (req,res) => {
    res.send("HEllo WORLD")
});


let userlist = new Map();

io.on('connection',(socket) =>{
    let  userName = socket.handshake.query.Username;
    adddUser(userName, socket.id)
 socket.broadcast.emit("user-list",[...userlist.keys()]);
 socket.emit("user-list",[...userlist.keys()]);

 

socket.on("chat created",function(data){
    socket.broadcast.emit("chat made",{user:data})

})
socket.on("group chat created",function(data){
    console.log(data)
    socket.broadcast.emit("group chat made",{user:data})

})
 socket.on("join", function(data){
     console.log(data)
     if (data.room != null && data.user !=null){
        socket.join(data.room);
        console.log(data.user+"user has join the room:"+data.room);
        socket.broadcast.to(data.room).emit("new user has joined",{user:data.user,message:"new user has joined "})

     }
     else{

       console.log("nul payload is being sent to socket:")
         
     }
     
 })
 socket.on("message",function(data){
     console.log(data)
     io.in(data.room).emit("new message",{user:data.user,message:data.message});

 })
 socket.on("leave", function(data){
   
    console.log(data.user+"left the room :"+data.room);
    socket.broadcast.to(data.room).emit("left room",{user:data.user,message:"has left the room"})
    socket.leave(data.room)

    
})
 socket.on("disconect",(reason)=>{
    deleteUser(Username,socket.id);
 })
});

function adddUser(Username,id){
    if (!userlist .has(Username)){
        userlist.set(Username,new Set(id))
    }else{
        userlist.get(Username).add(id)
    }
}



function deleteUser(Username,id){
     if (userlist.has(Username)){
        let user_id  = userlist.get(Username)
        if (user_id.size===0){
            userlist.delete(Username)
        }
     }
}
http.listen(3000,() =>(
    console.log("Sever is runinig")
))


//individual chat 

