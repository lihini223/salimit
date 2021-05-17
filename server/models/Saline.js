const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true
};

const SalineSchema = mongoose.Schema({
    name: requiredString,
    volume: {
        type: Number,
        required: true
    },
    details: requiredString
});

const Saline = mongoose.model('Saline', SalineSchema);

module.exports = Saline;