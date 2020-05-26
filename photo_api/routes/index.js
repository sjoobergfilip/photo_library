const express = require('express');
const router = express.Router();
const auth = require('../controllers/middlewares/auth');
const authController = require('../controllers/auth_controller');


// GET
router.get('/', (req, res) => {
  res.send({ status: "success" });
});


router.use('/albums', require('./albums'));
router.use('/photos', require('./photos'));


// POST
// add ability to login and get access-token and refresh-token
router.post('/login', [auth.basic], authController.login);


router.use('/users', require('./users'));
module.exports = router;