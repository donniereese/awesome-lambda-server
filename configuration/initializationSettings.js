// Default Room Event Handlers
const defaultREH = {
    connection: (socket, room, cb) => { console.log('Connected to {default}'); },
    disconnect: (socket, room, cb) => { console.log('Disconnected from {default}'); },
    connection_error: (socket, room, err, cb) => { console.log('Error connecting to {default}'); }
}

const lobbyREH = defaultREH;
lobbyREH.connection = (socket)

module.exports ={
    defaultRooms: [
        {
            name: 'Lobby',
            path: '/',
            permissions: {}.
            events 
        }
        {
            name: 'CS1', 
            path: '/cs1',
            permissions: {},
            events: defaultREH,
        }, 
        {
            name: 'CS2', 
            path: '/cs2',
            permissions: {},
            events: defaultREH,
        }, 
        {
            name: 'CS3', 
            path: '/cs3',
            permissions: {}, 
            events: defaultREH,
        }, 
        {
            name: 'CS4', 
            path: '/cs4',
            permissions: {}, 
            events: defaultREH,
        },  
        {
            name: '', 
            path: '/cs5',
            permissions: {}, 
            events: defaultREH,
        }, 
        {
            name: '', 
            path: '/cs6',
            permissions: {}, 
            events: defaultREH,
        }, 
        {
            name: '', 
            path: '/cs7',
            permissions: {}, 
            events: defaultREH,
        }, 
        {
            name: '', 
            path: '/cs8',
            permissions: {}, 
            events: defaultREH,
        },
        {
            name: '', 
            path: '/brownbag',
            permissions: {}, 
            events: defaultREH,
        }, 
        {
            name: '', 
            path: '/general',
            permissions: {}, 
            events: defaultREH,
        }, 
        {
            name: '', 
            path: '/random',
            permissions: {}, 
            events: defaultREH,
        }, 
        {
            name: '', 
            path: '/admin',
            permissions: {}, 
            events: defaultREH,
        },
        {
            name: '', 
            path: '/staff',
            permissions: {}, 
            events: defaultREH,
        }, 
        {
            name: '', 
            path: '/ta',
            permissions: {}, 
            events: defaultREH,
        }, 
        {
            name: '', 
            path: '/intro',
            permissions: {}, 
            events: defaultREH,
        }
    ]
};