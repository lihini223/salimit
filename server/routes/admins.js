const express = require('express');
const jwt = require('jsonwebtoken');

const Admin = require('../models/Admin');

const router = express.Router();

// add new device
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.json({ status: 'error', message: 'Invalid email' });

        if (admin.password !== password) return res.json({ status: 'error', message: 'Incorrect password' });

        const adminDetails = {
            email: admin.email
        };

        const token = jwt.sign(adminDetails, process.env.JWT_TOKEN);

        res.json({ status: 'success', token });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error', message: 'Internal error' });
    }
});

module.exports = router;