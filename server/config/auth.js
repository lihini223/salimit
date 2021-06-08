const jwt = require('jsonwebtoken');

function validateToken(token) {
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);

        return true;
    } catch (err) {
        return false;
    }
}

function checkAuthenticated(req, res, next) {
    const token = req.get('salimit-token');

    if (!token) return res.json({ status: 'error', message: 'No access' });

    if (validateToken(token)) {
        return next();
    }

    return res.json({ status: 'error', message: 'Invalid token' });
}

module.exports = {
    checkAuthenticated
}