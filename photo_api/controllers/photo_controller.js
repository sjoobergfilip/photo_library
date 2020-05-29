/**
 * Photo Controller
 */
const { matchedData, validationResult } = require('express-validator');

const models = require('../models');
/**
 * Get all resources
 *
 * GET /
 */
const index = async (req, res) => {
	// query db for user and eager load the books relation
	let user = null;
	try {
		user = await models.User.fetchById(req.user.data.id, { withRelated: ['photos'] });
	} catch (error) {
		console.error(error);
		res.sendStatus(404);
		return;
	}
	// get this user's book
	const photos = user.related('photos');
	res.send({
		status: 'success',
		data: {
			photos,
		},
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
	const validData = matchedData(req)
	try {
		const photo = await new models.Photos(validData).save();
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