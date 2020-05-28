const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albums_controller');
const albumValidationRules = require('../validation_rules/albums')

/* Get all resources */
router.get('/', albumController.index);

/* Get a specific resource */
router.get('/:albumId', albumController.show);

/* Store a new resource */
router.post('/', albumValidationRules.createRules, albumController.store);

/* Update a specific resource */
router.put('/:albumId', albumController.update);

/* Destroy a specific resource */
router.delete('/:albumId', albumController.destroy);

module.exports = router;