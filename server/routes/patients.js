const express = require('express');

const Patient = require('../models/Patient');
const SalimitDevice = require('../models/SalimitDevice');
const Saline = require('../models/Saline');

const router = express.Router();

router.get('/:wardNo', async (req, res) => {
    const wardNo = req.params.wardNo;

    try {
        const patients = await Patient.find({ wardNo, discharged: false });

        res.json({ status: 'success', patients });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error' });
    }
});

router.post('/new', async (req, res) => {
    const { patientId, name, wardNo, bedNo } = req.body;

    try {
        const patient = new Patient({
            patientId,
            name,
            wardNo,
            bedNo
        });

        const newPatient = await patient.save();

        res.json({ status: 'success', patient: newPatient });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error' });
    }
});

router.get('/:id', async (req, res) => {
    const patientId = req.params.id;

    try {
        const patient = await Patient.findById(patientId);

        let salineHistory = [];

        for (let i = 0; i < patient.salineHistory.length; i++) {
            const saline = await Saline.findById(patient.salineHistory[i].salineId);
            salineHistory.push(saline);
        }

        const patientDetails = {
            ...patient,
            salineHistory
        };

        res.json({ status: 'success', patient: patientDetails });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error' });
    }
});

router.post('/add-saline', async (req, res) => {
    const { wardNo, bedNo, salineId, deviceId } = req.body;

    try {
        const patient = await Patient.findOne({ wardNo, bedNo, discharged: false });
        if (!patient) return res.json({ status: 'error', message: 'Invalid patient' });

        const salimitDevice = await SalimitDevice.findOne({ deviceId });
        if (salimitDevice.inUse) return res.json({ status: 'error', message: 'Salimit device already in use' });

        const saline = await Saline.findById(salineId);
        if (!saline) return res.json({ status: 'error', message: 'Invalid saline' });

        const salineDetails = {
            action: 'give',
            salineId: saline._id,
            dateTime: new Date.now()
        };

        const updatedPatient = await Patient.updateOne({ _id: patient._id },
            { $push: { salineHistory: salineDetails },
            deviceId,
            salineStatus: 'normal'
        });
        
        const updatedSalimitDevice = await SalimitDevice.findOneAndUpdate({ deviceId }, { inUse: true });

        res.json({ status: 'success', patient: updatedPatient });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error' });
    }
});

router.get('/remove-saline/:id', async (req, res) => {
    const patientId = req.params.id;

    try {
        const patient = await Patient.findOne({ patientId });
        if (!patient) return res.json({ status: 'error', message: 'Invalid patient' });

        const salineDetails = {
            action: 'remove',
            dateTime: new Date.now()
        };

        const updatedPatient = await Patient.updateOne({ patientId },
            { $push: { salineHistory: salineDetails },
            deviceId: null,
            salineStatus: null
        });

        const device = await SalimitDevice.findOneAndUpdate({ deviceId: patient.deviceId }, { inUse: false });

        res.json({ status: 'success', patient: updatedPatient });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error' });
    }
});

router.get('/discharge/:id', async (req, res) => {
    const patientId = req.params.id;

    try {
        const patient = await Patient.findOne({ patientId });
        if (!patient) return res.json({ status: 'error', message: 'Invalid patient' });

        const updatedPatient = await Patient.updateOne({ patientId }, { discharged: true });

        res.json({ status: 'success', patient: updatedPatient });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error' });
    }
});

module.exports = router;