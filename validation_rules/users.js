// User validation rules
const { body } = require('express-validator');
const models = require('../models')

//create rules for register a new user
const createRules = [
    body('email').isLength({ min: 3 }).custom(async value => {
        const user = await new models.User({ email: value }).fetch({ require: false});
        if(user) {
            return Promise.reject('email already exists.')
        }
        return Promise.resolve();
    }),
    //ruls fore regisger a new user.
    body('password').isLength({ min: 3 }),
    body('first_name').isLength({ min: 2 }),
    body('last_name').isLength({ min: 2 }),
];

module.exports = {
    createRules,
}