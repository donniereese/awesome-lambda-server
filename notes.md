Startup Flow
    * load settings initalizer
        (All of these are considered "if exists")
        * 


So the RoomObject gets a io connection, which allows it to get it's custom path room.  It then needs to process 
all of the custom events, if any, or use the default ones.  ( Create good default events, dangit! )

The room's socket requires a on "connection", which is passed a function that has a socket passed to it.
That socket, within that function, is what calls all of the events for that connection.  So there needs to be a 
main "event" method that is passed ot the room's io.on'connection' that can itterate through it's own list of 
events dynamically and pass them to the socket within that function.


Each feed gets it's own namespace.  This allows for threads to be created as "rooms" within that namespace.

There will be a DM namespace and each message group get's it's own special ID associated with the participants as a room