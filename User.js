class User {
    constructor(id, socket, socketServer) {
        this.id = id;
        this.socket = socket
        this.socketServer = socketServer

        socket.on('send_message', (data)=>{
            this.socketServer.sendMessageToAll(data, this.id)
        })


        // отключаем юзеров
        socket.on('disconnect', ()=>{
            console.log('🔥: A user disconnected!!!');
            this.socketServer.handleUserDisconect(socket)
        })
    }
}
module.exports = {User}
