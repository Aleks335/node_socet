const express = require('express');
const app = express();
const PORT = 4000;

//New imports
const http = require('http').Server(app);
const cors = require('cors');

const {SocketServer} = require("./SocketServer");

app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        method:["GET","POST"],
    }
});

const socketServer = new SocketServer(socketIO)
socketServer.start()




http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});





