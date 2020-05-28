/**
 * Album Controller
 */
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');
/**
 * Get all resources
 *
 * GET /
 */
const index = async (req, res) => {
	const all_albums = await models.Albums.fetchAll();
	res.send({
		status: 'success',
		data: {
			albums: all_albums
		}
	});
}
/**
 * Get a specific resource
 *
 * GET /:albumId
 */
const show = async (req, res) => {
	const album = await new models.Albums({ id: req.params.albumId })
		.fetch({ withRelated: ['photos'] });
	res.send({
		status: 'success',
		data: {
			album,
		}
	});
}
/**
 * Store a new resource
 *
 * POST /
 */
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
		const album = await new models.Albums(validData).save();
		console.log("Created new photo successfully:", album);
		res.send({
			status: 'success',
			data: {
				album,
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
 * POST /:albumId
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
 * DELETE /:albumId
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