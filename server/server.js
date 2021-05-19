if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// import modules and packages
const http = require('http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socketio = require('socket.io');

const Patient = require('./models/Patient');
const SalimitDevice = require('./models/SalimitDevice');
const Saline = require('./models/Saline');

const app = express();

// database connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    console.log('New request to /');
    res.send('Received');
});

// import route handlers
const devicesRouter = require('./routes/devices');
const salinesRouter = require('./routes/salines');
const patientsRouter = require('./routes/patients');

// use route handlers
app.use('/devices', devicesRouter);
app.use('/salines', salinesRouter);
app.use('/patients', patientsRouter);

//const { getAdmins, addAdmin } = require('./test/db');

// add saline to patient
app.post('/add-saline', async (req, res) => {
    const { wardNo, bedNo, salineId, deviceId } = req.body;

    try {
        const patient = await Patient.findOne({ wardNo, bedNo, discharged: false });
        if (!patient) return res.json({ status: 'error', message: 'Invalid patient' });

        const salimitDevice = await SalimitDevice.findOne({ deviceId });
        if (!salimitDevice) return res.json({ status: 'error', message: 'Invalid device' });
        if (salimitDevice.inUse) return res.json({ status: 'error', message: 'Salimit device already in use' });

        const saline = await Saline.findById(salineId);
        if (!saline) return res.json({ status: 'error', message: 'Invalid saline' });

        const salineDetails = {
            action: 'give',
            salineId: saline._id,
            dateTime: Date.now()
        };

        /*const updatedPatient = await Patient.updateOne({ _id: patient._id },
            { $push: { salineHistory: salineDetails },
            deviceId,
            salineStatus: 'normal'
        });*/

        patient.salineHistory.push(salineDetails);
        patient.deviceId = deviceId;
        patient.salineStatus = 'normal';

        patient.save();

        //patient = await Patient.findOne({ wardNo, bedNo, discharged: false });

        emitSalineStatus(patient);
        
        const updatedSalimitDevice = await SalimitDevice.findOneAndUpdate({ deviceId }, { inUse: true });

        res.json({ status: 'success', patient });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error' });
    }
});

// remove saline from patient
app.get('/remove-saline/:id', async (req, res) => {
    const patientId = req.params.id;

    try {
        const patient = await Patient.findOne({ patientId });
        if (!patient) return res.json({ status: 'error', message: 'Invalid patient' });

        const salineDetails = {
            action: 'remove',
            dateTime: Date.now()
        };

        /*const updatedPatient = await Patient.updateOne({ patientId },
            { $push: { salineHistory: salineDetails },
            deviceId: null,
            salineStatus: null
        });*/

        const updatedSalimitDevice = await SalimitDevice.findOneAndUpdate({ deviceId: patient.deviceId }, { inUse: false });

        patient.salineHistory.push(salineDetails);
        patient.deviceId = null;
        patient.salineStatus = null;

        patient.save();

        //patient = await Patient.findOne({ wardNo, bedNo, discharged: false });

        emitSalineStatus(patient);

        res.json({ status: 'success', patient });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error' });
    }
});

const server = http.createServer(app);

const io = socketio(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', socket => {
    console.log('new socket connection');
    
    const wardNo = 'W' + socket.handshake.query.wardNo;

    socket.join(wardNo);
});

function emitSalineStatus(patient) {
    const wardNo = 'W' + patient.wardNo;

    io.to(wardNo).emit('saline-status', patient);
}

/* app.get('/saline-status', (req, res) => {
    const { wardNo, bedNo, status, deviceId } = req.query;
    console.log('New request to saline');
    console.log(req.url);
    console.log(wardNo);
    console.log(bedNo);
    console.log(status);
    console.log(typeof wardNo);
    console.log(typeof bedNo);
    console.log(typeof status);
    res.send('Success');
}); */

const PORT = process.env.PORT || 8081;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));