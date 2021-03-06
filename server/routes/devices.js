const express = require('express');

const SalimitDevice = require('../models/SalimitDevice');
const Patient = require('../models/Patient');

const router = express.Router();

// get all devices
router.get('/', async (req, res) => {
    try {
        const devices = await SalimitDevice.find();

        res.json({ status: 'success', devices });
    } catch (err) {
        res.json({ status: 'error', devices: [] });
    }
});

// add new device
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

module.exports = router;