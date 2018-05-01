class roomPrimitive {
    constructor(room = {}) {
        this._ioConnection = room.connection || null;
        this._ioPath = room.path || null;
        this._namespace = (this._ioConnection && this._ioPath) ? this.ioConnection.of(this._ioPath) : null;
        this._initialized = this._namespace !== null;
        this._events = {};
        this.permissions = room.permissions || {};
        this.oC = 0;
        this.oU = [];

        // Add the events from the room initializer. It will return false if there is not a events property.
        this.addEvents(room.events);
        
        // If everything is in order, pass the master event method to the namespace's connection event.
        if (this._namespace) this.createConnectionEvent();
    }

    addEvents(events) {
        // `events` argument is null or wasn't supplied
        if (!events) return false;

        // `events` is an object
        if (typeof events === 'object') {
            const eventNames = Object.keys(events);
            for(let i = 0; i < eventNames.length; i++) {
                this._events[eventNames[i]] = events[i];
                if (this._initialized) this._namespace.on(eventNames[i], this._events[eventNames[i]])
            }
        }
        // `events` is an array
        if (typeof events === 'array') {
            for(let i = 0; i < events.length; i++) {
                console.log(events[i]);
                this._events.push(events[i]);
            }
        }
    }

    addEvent(eventObj) {
        
    }

    removeEvent(eventName) {
        
    }

    getEventByName(eventName) {
        
    }

    eventController(socket) {
        // Make sure this has a socket
        if (!socket) return false;

        // Get the event Names
        const eventNames = Object.keys(this._events);
        // Set the events in a loop
        for (let i of eventNames) {
            // Check to see if `event` is a function
            if (typeof this._events[eventNames[i]] === 'function') {
                // Is this the 'connection' event? If so, just run it.
                if (eventNames[i] === 'connection' || eventNames[i] == 'connect') {
                    this._events[eventNames[i]]();
                } else {
                    // Set socket with the connection name & and it's function and bind it to the room `this`
                    socket.on(eventNames[i], this._events[eventNames[i]].bind(this));
                }
            } else {
                // This was not a function, log it out.
                console.log(`Error: Room '${this._ioPath}' attempted to add event '${eventNames[i]}', but the method was not a function.`);
                console.log(`Supplied: \n${this._events[eventNames[i]]}`);
            }
        }
    }

    createConnectionEvent() {
        // Make sure this isn't being called without a valid namespace
        if (!this._namespace) return false;

        // Set the master Event Controller
        this._namespace.on('connection', this.eventController.bind(this));
    }

    set connection(io) {
        this._ioConnection = io;
    }

    get connection() {
        return this._ioConnection;
    }

    get onlineCount() {
        return this.oU;
    }

    _onConnect() {
        
    }

    _onDisconnect(socket) {
        
    }

    _onConnectionError() {
        
    }
}

module.exports = roomPrimitive;