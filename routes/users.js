const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');
const userValidationRules = require('../validation_rules/users');


/* Get all resources */
router.get('/', userController.index);

/* Get a specific resource */
router.get('/:userId', userController.show);

/* Store a new resource */
router.post('/', userValidationRules.createRules, userController.store);

/* Destroy a specific resource */
router.delete('/:userId', userController.destroy);
module.exports = router;
