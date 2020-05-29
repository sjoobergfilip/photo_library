const login = require('../controllers/profile_controller');
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
router.use('/profile', [auth.basic], require('./profile'));
router.post('/register', [userValidationRules.createRules], authController.register);
router.use('/users', [auth.basic], require('./users'));

//login and auth
router.post('/login', [auth.basic], login.getProfile);

module.exports = router;