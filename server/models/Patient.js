const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true
};

const PatientSchema = mongoose.Schema({
    patientId: requiredString,
    name: requiredString,
    wardNo: {
        type: Number,
        required: true
    },
    bedNo: {
        type: Number,
        required: true
    },
    salineHistory: [],
    discharged: {
        type: Boolean,
        required: true,
        default: false
    },
    deviceId: {
        type: String,
        default: null
    },
    salineStatus: {
        type: String,
        default: null
    }
});

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;