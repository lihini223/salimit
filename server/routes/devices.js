const express = require('express');

const { checkAuthenticated } = require('../config/auth');
const SalimitDevice = require('../models/SalimitDevice');
const Patient = require('../models/Patient');

const router = express.Router();

// get all devices
router.get('/', checkAuthenticated, async (req, res) => {
    try {
        const devices = await SalimitDevice.find();

        res.json({ status: 'success', devices });
    } catch (err) {
        res.json({ status: 'error', devices: [] });
    }
});

// add new device
router.post('/new', checkAuthenticated, async (req, res) => {
    const { deviceId } = req.body;

    try {
        const existingDevice = await SalimitDevice.findOne({ deviceId });
        if (existingDevice) return res.json({ status: 'error', message: 'Device ID already exists' });
        
        const salimitDevice = new SalimitDevice({
            deviceId
        });

        const newSalimitDevice = await salimitDevice.save();

        res.json({ status: 'success', salimitDevice: newSalimitDevice });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error', message: 'Internal error' });
    }
});

module.exports = router;