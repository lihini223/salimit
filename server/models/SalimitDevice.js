const mongoose = require('mongoose');

const SalimitDeviceSchema = mongoose.Schema({
    deviceId: {
        type: String,
        required: true
    },
    inUse: {
        type: Boolean,
        required: true,
        default: false
    }
});

const SalimitDevice = mongoose.model('SalimitDevice', SalimitDeviceSchema);

module.exports = SalimitDevice;