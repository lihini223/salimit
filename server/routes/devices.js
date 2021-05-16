const express = require('express');

const SalimitDevice = require('../models/SalimitDevice');

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

router.get('/saline-status', (req, res) => {
    const { wardNo, bedNo, status, deviceId } = req.query;
    console.log('New request from device');
    console.log(req.url);
    console.log(wardNo);
    console.log(bedNo);
    console.log(status);
    console.log(typeof wardNo);
    console.log(typeof bedNo);
    console.log(typeof status);
    res.send('Success');
});

module.exports = router;