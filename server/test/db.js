const Admin = require('../models/Admin');

async function getAdmins() {
    try {
        const admins = await Admin.find();

        console.log(admins);
    } catch (err) {
        console.log(err);
    }
}

async function addAdmin() {
    try {
        const admin = new Admin({
            email: 'admin@salimit.lk',
            password: 'admin'
        });

        const newAdmin = await admin.save();

        console.log(newAdmin);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getAdmins,
    addAdmin
}