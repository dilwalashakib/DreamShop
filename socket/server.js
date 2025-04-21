const { Server } = require("socket.io");
const http = require("http");

const PORT = 5000;

const server = http.createServer();
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});

// Socket Connection
let users = {};

io.on('connect', (socket) => {
    console.log('user Connected');
    const userId = socket.handshake.query.userId;
    // Connect
    if(userId) {
        if(!users[userId]) {
            users[userId] = { socketId: socket.id };
        }
        io.emit('getUsers', users);
    }

    // Disconnect 
    socket.on("disconnect", () => {
        console.log('user disconnected');
        delete users[userId];
        io.emit("getUsers", users);
    });

    // send Message
    socket.on("sendMessage", (msg) => {
        if(users[msg.receiverId]) {
            socket.to(users[msg.receiverId].socketId).emit('getMessage', msg);
        }
    });
    // Add-Customer
    socket.on("addCustomer", (user) => {
        if(users[user.sellerId]) {
            socket.to(users[user.sellerId].socketId).emit('getCustomer', user);
        }
    });

    // Seen Messege
    // socket.on("messegeSeen", (msg) => {
    //     const findUser = user.find((u) => u.userId === msg.senderId);
    //     if(findUser) {
    //         socket.to(findUser.socketId).emit("getSeenMessege", msg);
    //     }
    // }); 
    // socket.on("deliveredMessege", (msg) => {
    //     const userFind = user.find((u) => u.userId === msg.senderId);
    //     if(userFind) {
    //         socket.to(userFind.socketId).emit('getDeliveredMsg', msg);
    //     }
    // });
    // socket.on('logout', (userId) => {
    //     user = user.filter((u) => u.userId !== userId);
    //     io.emit("getAllUser", user);
    // });
});

server.listen(PORT, () => console.log(`Socket Server Runnning Port ${PORT}`));