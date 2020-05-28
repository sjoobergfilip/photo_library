const { body } = require('express-validator');
const models = require('../models')

//create rules for register a new user
const createRules = [
    body('title').isLength({ min: 3 }).custom(async value => {
        const title = await new models.Photos({ title: value }).fetch({ require: false});
        if(title) {
            return Promise.reject('titel already exists.')
        }
        return Promise.resolve();
    }),
    //ruls fore regisger a new phot.
    body('title').isLength({ min: 3 }),
    body('url').isLength({ min: 2 }),
    body('comment').optional().isLength({ min: 2 }),
    body('album_id').optional().isLength({ min: 1 }),
];

module.exports = {
    createRules,
}