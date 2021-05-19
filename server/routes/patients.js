const express = require('express');

const Patient = require('../models/Patient');
const SalimitDevice = require('../models/SalimitDevice');
const Saline = require('../models/Saline');

const router = express.Router();

// get all patients by ward no
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

// add new patient
router.post('/new', async (req, res) => {
    const { patientId, name, wardNo, bedNo } = req.body;

    try {
        const existingPatient = await Patient.findOne({ wardNo, bedNo, discharged: false });
        if (existingPatient) return res.json({ status: 'error', message: 'Bed is already taken' });
        
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
        res.json({ status: 'error', message: 'Internal error' });
    }
});

// get patient by id
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

// discharge patient
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