const express = require('express');
const router = express.Router();
const auth = require('../controllers/middlewares/auth');
const authController = require('../controllers/auth_controller');
const userValidationRules = require('../validation_rules/users');


// GET
router.get('/', (req, res) => {
  res.send({ status: "success" });
});


router.use('/albums', [auth.basic], require('./albums'));
router.use('/photos', [auth.basic], require('./photos'));

// POST
router.post('/register', [userValidationRules.createRules], authController.register);
router.use('/users', [auth.basic], require('./users'));


module.exports = router;