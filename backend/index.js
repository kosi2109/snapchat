const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors')
const socket = require('socket.io')
dotenv.config()


const app = express()
app.use(cors())
app.use(express.json({}))
const API_END_POINT = process.env.API_END_POINT

app.get(`${API_END_POINT}/`,(req,res)=>{
    res.send('Api successfully')
})



//route
const AuthRoute = require('./routes/Auth');
const ChatRoute = require('./routes/Chat');
const MessageRoute = require('./routes/Message');
const UserRoute = require('./routes/User');


app.use(`${API_END_POINT}/auth`,AuthRoute)
app.use(`${API_END_POINT}/chat`,ChatRoute)
app.use(`${API_END_POINT}/message`,MessageRoute)
app.use(`${API_END_POINT}/user`,UserRoute)


const PORT = process.env.PORT

const server = app.listen(PORT,()=>{
    connectDB()
    console.log(`server listening on ${PORT}`);
})


const io = socket(server,{
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
})

var users = new Array()

io.on('connection',(socket)=>{    
    socket.on("setup", (id) => {
        socket.join(id);
        socket.emit("connected");
        socket.emit("online users", users);
    });

    socket.on('online',(id)=>{
        if(users.some(user=> user.userId !== id) || users.length < 1){
            users.push({userId:id,socketId:socket.id})
        }
        users.forEach(user=>{
            socket.to(user.userId).emit("online users", users);
        })

    })

    socket.on("join chat", (room) => {
        socket.join(room);
    });

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;
            socket.in(user._id).emit("message recieved", newMessageRecieved);
        }); 
    });

    socket.on('disconnect',()=>{
        users = users.filter(user=> user.socketId !== socket.id)
        users.forEach(user=>{
            socket.to(user.userId).emit("online users", users);
        })
    })

})
