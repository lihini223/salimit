const express = require('express');

const { checkAuthenticated } = require('../config/auth');
const Saline = require('../models/Saline');

const router = express.Router();

// get all salines
router.get('/', checkAuthenticated, async (req, res) => {
    try {
        const salines = await Saline.find();

        res.json({ status: 'success', salines });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error', salines: [] });
    }
});

// get saline by id
router.get('/:salineId', checkAuthenticated, async (req, res) => {
    const salineId = req.params.salineId;

    try {
        const saline = await Saline.findById(salineId);

        res.json({ status: 'success', saline });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error' });
    }
});


// add new saline
router.post('/new', checkAuthenticated, async (req, res) => {
    const { name, volume, details } = req.body;

    try {
        const editedDetails = details.replace(/(?:\r\n|\r|\n)/g, '. ');

        const saline = new Saline({
            name,
            volume: Number(volume),
            details: editedDetails
        });

        const newSaline = await saline.save();

        res.json({ status: 'success', saline: newSaline });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error' });
    }
});

// edit saline
router.post('/edit/:id', checkAuthenticated, async (req, res) => {
    const salineId = req.params.id;

    try {
        res.json({ status: 'success' });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error' });
    }
});

// delete saline
router.get('/delete/:id', checkAuthenticated, async (req, res) => {
    const salineId = req.params.id;

    try {
        const deletedSaline = await Saline.findByIdAndDelete(salineId);

        res.json({ status: 'success', saline: deletedSaline });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error' });
    }
});

module.exports = router;