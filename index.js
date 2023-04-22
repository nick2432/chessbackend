const express =require('express')
const http = require('http')
const {Server} = require('socket.io')
const app=express()
const dotenv=require('dotenv')
const cors =require("cors");
app.use(cors());
const server =http.createServer(app)
var val=null;
const io =new Server(server,{
    cors:{
        origin:"*"
    },
});
const gamecode=[];
io.on("connection",(socket)=>{
    socket.on('code1',(data)=>{
      const found = gamecode.findIndex((Px) => Px.code===`${data}`);
      if(found!=-1 && gamecode[found].player===2){
        socket.emit("not","room is full");
      }
      else if(found!=-1){
        gamecode[found].player=2;
      socket.join(data);
      socket.emit("yes","valid");
      socket.on("send_message",(data1)=>{
        socket.to(data).emit("receive_message",data1)
      });
      socket.on("send_message1",(data1)=>{
        socket.to(data).emit("receive_message1",data1)
      });
    socket.on("send",(data1)=>{
      socket.to(data).emit("receive",data1)
    });
    socket.on("checkmate",(data1)=>{
      socket.to(data).emit("lose",data1)
    });
    }
    else{
      socket.emit("not","not valid");
    }
    })
    socket.on('code',(data)=>{
      socket.join(data);
      gamecode.push({code:data,player:1});
      socket.on("send_message",(data1)=>{
        socket.to(data).emit("receive_message",data1)
    });
    socket.on("send_message1",(data1)=>{
      socket.to(data).emit("receive_message1",data1)
    });
    socket.on("send",(data1)=>{
      socket.to(data).emit("receive",data1)
    });
    socket.on("checkmate",(data1)=>{
      socket.to(data).emit("lose",data1)
    });
    });
  });
const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Listening on port ${port}`));