const express = require('express');
const app = express();
const http = require('http').Server(app);
const  io = require('socket.io')(http);

const Room = require('./dataTypes/Room.js');
const User = require('./dataTypes/User.js');

const settingsInit = require('./configuration/initializationSettings.js');


const _ROOT     = __dirname;
const _PUBLIC = _ROOT + '/public'
const port = 3000;


app.get('/', function(req, res){
    res.sendFile(_PUBLIC + '/index.html');
});



const roomHandler = {
    connection: (socket) => {
        socket.on('disconnect', roomHandler.disconnectCleanup);
        
    }, 
    disconnect: (socket) => {
        
    },
    events: {
        message: (msg) => {
            // 
        }
    }
}

class AwesomeLambdaServer {
    constructor(init = {}) {
        /*Set Server settings from `settings` or use default for those that we assign default for*/
        // Socket.io connection Sort of the cornerstone of the app, ya know?
        this._io = init.socketio || null;
        // Secret key for security's sake
        this._secretKey = init.secretKey || require('crypto').randomBytes(48).toString('hex');
        // Rooms object; it manages current roomspaces and their socket path
        this._rooms = {};
        // Users object; manages current users online
        this._users = {};

        // if the socket and the key were set, set everything up, else wait for things to be set and configured manually.
        if ( this._io && this._secretKey ) {
            // Set Rooms from initialization object
            if (init.defaultRooms) this.createRooms(init.defaultRooms);
        }

        console.log('Awesome Labda Service has started in standalone mode.');
        console.log('Your unique secret key is: ' + this._secretKey);
        console.log('');
    }
    
    createRooms(rooms) {
        if (typeof rooms === 'array') {
            rooms.forEach(room => {
                this._rooms[room[0]] = new Room(room);
            });
            
        } else if (typeof rooms === 'object') {
            rooms.forEach(room => {
                this._rooms[room.name] = new Room(room);
            });
        }
    }    
}

io.on('connection', function(socket){
    console.log('a user connected');
    socket.emit('sys_msg', 'Welcome!');

    socket.on('message', function(msg){
        console.log('message: ' + msg);
    });

    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

// Set the `socketio` property of the init object to pass to ALS.
settingsInit.socketio = io;

// Initialize the Awesome Lambda Server
const ALS = new AwesomeLambdaServer(settingsInit);

// http port for public web requests.  Basic boilerplate stuff for connection status, ect.
// TODO: have this display basic connection info.  Should hook into ALS to get info
http.listen(port, function(){
    // Display connection status from the listener
    console.log(`listening on *:${port}`);
});

/*

/rooms/cs1
/rooms/cs2
/rooms/bander... ect
# references rooms


the goal is to be able to type something like
ALS.broadcastToRoom('cs3').from('asdf').andSay('message');
ALS.room('cs3').broadcast('message');




*/