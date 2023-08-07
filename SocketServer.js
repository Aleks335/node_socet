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
            // socket.join("some room");

           socket.on('user_name',(data)=>{
                this.users.push(new User(socket.id, socket, this, data.textMessage, data.room))
                console.log('data.room)', data.room)
                console.log('data.textMessage)', data.textMessage)
                this.ServiceMessage('🤗',  data.textMessage, 'user Connected!')
                socket.join("some room");
            })
           socket.on('new rooms',(data)=>{

               socket.join(data.textMessage);
           });

       });
    }

    handleUserDisconect(userName){
        this.ServiceMessage('😭',  userName, 'user disconnected!')
    }


    async sendMessageToAll(data, avtorID, user_Name) {

      const fetchSockets = await this.socketIO.in('some room').fetchSockets();
      console.log('fetchSockets', fetchSockets)

        fetchSockets.forEach((item) => {
            console.log('item', item)
            const userConnect = item.id === avtorID ? 'my_message' : 'other_message';
            item.emit("receiving_message", {

                    textMessage: data.textMessage,
                    myMessage: userConnect,
                    timeMessage: this.timeMessage,
                    userName: user_Name,
                }
            );
        })


        // this.users.forEach((item) => {
        //     const userConnect = item.id === avtorID ? 'my_message' : 'other_message';
        //
        //     item.socket.emit("receiving_message", {
        //             textMessage: data.textMessage,
        //             myMessage: userConnect,
        //             timeMessage: this.timeMessage,
        //             userName: user_Name,
        //         }
        //     );
        // })
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
