const Patient = require('./models/Patient');

function websocketServer(io) {
    io.on('connection', socket => {
        console.log('new socket connection');
        
        const wardNo = socket.handshake.query.wardNo;

        console.log(wardNo);

        socket.join(wardNo);
    });
}

function emitSalineStatus(patient) {
    const wardNo = patient.wardNo;

    io.to(wardNo).emit('saline-status', patient);
}

module.exports = {
    websocketServer,
    emitSalineStatus
}