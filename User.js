
class User {
    constructor(id, socket, socketServer, userName, room) {
        this.id = id;
        this.socket = socket
        this.socketServer = socketServer
        this.userName = userName
        this.room = room

        socket.on('send_message', (data)=>{
            this.socketServer.sendMessageToAll(data, this.id, this.userName, this.room)
        })



        // отключаем юзеров
        socket.on('disconnect', ()=>{
            console.log('🔥: A user disconnected!!!');
            this.socketServer.handleUserDisconect(this.userName)
        })
    }
}
module.exports = {User}
