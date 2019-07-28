const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
//get datamodels from models folder
const Character = require('./models/characterModel');
const Group = require('./models/groupModel');
const GroupCharacterAssoc = require('./models/groupCharacterAssocModel');

//add the Router and pass models back to the router
const characterRouter = require('./routes/characterRouter')(Character);
const groupRouter = require('./routes/groupRouter')(Group);
const groupCharacterAssocRouter = require('./routes/groupCharacterAssocRouter')(GroupCharacterAssoc);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Database connector
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

const db = mongoose.connect('mongodb+srv://InTrackerUser:InTrackerPassword@intrackerdb-y9e2a.mongodb.net/InTrackerDB?retryWrites=true', options);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//load all of the routes;
app.use('/api', characterRouter);
app.use('/api', groupRouter);
app.use('/api', groupCharacterAssocRouter);

app.get('/', (req, res) => {
    res.send('Welecome To the InTrackerAPI!');
})

app.server = app.listen(port, () => {
    console.log(`Running on Port ${port}`);
})

module.exports = app;