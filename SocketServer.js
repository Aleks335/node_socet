const {User} = require("./User");

class SocketServer {
    constructor(socketIO) {
        this.users = [];
        this.socketIO = socketIO;
        this.date = new Date();
        this.timeMessage = this.date.toString().slice(16,21)
    }

    start(){
       this.socketIO.on('connection', (socket) => {
            console.log('user of')
            console.log(`⚡: ${socket.id} user just connected!`);

           this.ServiceMessage('🤗',socket.id,'user connected!')

           this.users.push(new User(socket.id, socket, this))
           // socket.on('user_name',(data)=> this.users.push(new User(socket.id, socket, this, data.user_name)))
           // socket.on('user_name',(data)=> console.log( "data.user_name", data.user_name))


            //this - ссылка на себя (на твой обьект (SocketServer))
        });
    }

    handleUserDisconect(socket){
        this.ServiceMessage('😭',  socket.id, 'user disconnected!')
    }

    sendMessageToAll(data, avtorID){
        this.users.forEach((item)=>{
            const userConnect = item.id === avtorID? 'my_message' : 'other_message';
            item.socket.emit("receiving_message", {
                textMessage : data.textMessage,
                myMessage : userConnect,
                timeMessage : this.timeMessage
                }
            );
        })
    }
    ServiceMessage(icon, idUser, message){
        this.users.forEach((item)=>{
            item.socket.emit("receiving_message",{
                textMessage : `${icon} : ${idUser} ${message}`,
                myMessage: 'service_message',
                timeMessage : this.timeMessage
            })
        })
    }

}
module.exports = {SocketServer}
