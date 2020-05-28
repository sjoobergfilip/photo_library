const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller.js');
const profileValidationRules = require('../validation_rules/profile');
//  GET profile 
router.get('/', profileController.getProfile);
//  GET profile's photos
router.get('/photos', profileController.getPhotos);

module.exports = router;