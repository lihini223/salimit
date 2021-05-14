if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const http = require('http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socketio = require('socket.io');

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    console.log('New request');
    console.log(req.url);
    console.log(req.query.info);
    res.send('Hello from the backend');
});

//const { getAdmins, addAdmin } = require('./test/db');

const server = http.createServer(app);

const io = socketio(server, {
    cors: {
        origin: '*'
    }
});

const PORT = process.env.PORT || 8081;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));