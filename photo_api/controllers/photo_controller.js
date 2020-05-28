/**
 * Photo Controller
 */
const { validationResult } = require('express-validator');

const models = require('../models');
/**
 * Get all resources
 *
 * GET /
 */
const index = async (req, res) => {
	const all_photos = await models.Photos.fetchAll();
	res.send({
		status: 'success',
		data: {
			photos: all_photos
		}
	});
}
/**
 * Get a specific resource
 *
 * GET /:photoId
 */
const show = async (req, res) => {
	const photo = await new models.Photos({ id: req.params.photoId })
		.fetch();
	res.send({
		status: 'success',
		data: {
			photo,
		}
	});
}

//store a new resurs in db

const store = async (req, res) => {

	console.log('hej', req.body);
	// Finds the validation errors in this request and wraps them in an object with handy functions
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("Create photo request failed validation:", errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}

	try {
		const photo = await new models.Photos(req.body).save();
		console.log("Created new photo successfully:", photo);
		res.send({
			status: 'success',
			data: {
				photo,
			},
		});
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new user.',
		});
		throw error;
	}
}
/**
 * Update a specific resource
 *
 * POST /:photoId
 */
const update = (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
}
/**
 * Destroy a specific resource
 *
 * DELETE /:photoId
 */
const destroy = (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
}
module.exports = {
	index,
	show,
	store,
	update,
	destroy,
}