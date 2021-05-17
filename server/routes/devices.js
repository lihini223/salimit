const express = require('express');

const SalimitDevice = require('../models/SalimitDevice');
const Patient = require('../models/Patient');
const { emitSalineStatus } = require('../websocket-server');

const router = express.Router();

router.post('/new', async (req, res) => {
    const { deviceId } = req.body;

    try {
        const salimitDevice = new SalimitDevice({
            deviceId
        });

        const newSalimitDevice = await salimitDevice.save();

        res.json({ status: 'success', salimitDevice: newSalimitDevice });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error' });
    }
});

router.get('/saline-status', async (req, res) => {
    const { wardNo, bedNo, salineStatus, deviceId } = req.query;
    
    try {
        const patient = await Patient.findOne({ deviceId });

        const updatedPatient = await Patient.findOneAndUpdate({ deviceId }, { salineStatus: salineStatus });

        emitSalineStatus(patient);
    } catch (err) {
        console.log(err);
    }

    res.send('Success');
});

module.exports = router;