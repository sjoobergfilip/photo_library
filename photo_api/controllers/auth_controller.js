const bcrypt = require('bcrypt');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

const register = async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
const errors = validationResult(req);
if (!errors.isEmpty()) {
    console.log("Create user request failed validation:", errors.array());
    res.status(422).send({
        status: 'fail',
        data: errors.array(),
    });
    return;
}
const validData = matchedData(req);
// generate a hash of validData.password
try {
    validData.password = await bcrypt.hash(validData.password, models.User.hashSaltRounds);
} catch (error) {
    res.status(500).send({
        status: 'error',
        message: 'Exception thrown when hashing the password',
    })
}
try {
    const user = await new models.User(validData).save();
    console.log("Created new user successfully:", user);
    res.status(201).send({
        status: 'success',
        data: null,
    });
} catch (error) {
    res.status(500).send({
        status: 'error',
        message: 'Exception thrown in database when creating a new user.',
    });
    throw error;
    }
}

module.exports = {
    register
}