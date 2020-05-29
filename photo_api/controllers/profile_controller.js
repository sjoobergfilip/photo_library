/**
 * Profile Controller
 */
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');
/**
 * Get authenticated user's profile
 *
 * GET /
 */
const getProfile = async (req, res) => {
	if (!req.user) {
		res.status(401).send({
			status: 'fail',
			data: 'Authentication Required.',
		});
		return;
	}
	res.send({
		status: 'success',
		data: {
			user: req.user,
		}
	});
}

const getPhotos = async (req, res) => {
	console.log(req.user)
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


	const getAlbums = async (req, res) => {
	console.log(req.body)
		// query db for user and eager load the books relation
		let user = null;
		try {
			user = await models.User.fetchById(req.user.data.id, { withRelated: ['albums'] });
		} catch (error) {
			console.error(error);
			res.sendStatus(404);
			return;
		}
		// get this user's book
		const albums = user.related('albums');
		res.send({
			status: 'success',
			data: {
				albums,
			},
		});
	}

/**
 * Update the authenticated user's profile
 *
 * PUT /
 */
const updateProfile = async (req, res) => {
	res.status(405).send({
		status: 'error',
		message: 'This is also a workshop.',
	});
}
module.exports = {
	getProfile,
	getPhotos,
	getAlbums,
	updateProfile,
}