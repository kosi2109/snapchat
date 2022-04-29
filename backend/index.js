const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors')
const socket = require('socket.io')
const path = require("path");
dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())


//route
const AuthRoute = require('./routes/Auth');
const ChatRoute = require('./routes/Chat');
const MessageRoute = require('./routes/Message');
const UserRoute = require('./routes/User');


app.use(`/api/auth`,AuthRoute)
app.use(`/api/chat`,ChatRoute)
app.use(`/api/message`,MessageRoute)
app.use(`/api/user`,UserRoute)

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1,"build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

const server = app.listen(process.env.PORT || 3000,()=>{
    console.log(`server listening`);
})


const io = socket(server,{
    cors: {
        origin: "https://realtime-snap.herokuapp.com",
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

    socket.on("start typing", ({chat,sender}) => {
        chat.users.forEach((user) => {
            if (user._id == sender._id) return;
            socket.in(user._id).emit("start typing", {chat,sender});
        });
    });

    socket.on("stop typing", ({chat,sender}) => {
        chat.users.forEach((user) => {
            if (user._id == sender._id) return;
            socket.in(user._id).emit("stop typing", {chat,sender});
        });
    });

    socket.on("delete chat", (selectChat) => {
        selectChat.users.forEach((user) => {
            socket.in(user._id).emit("delete chat");
        });
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
