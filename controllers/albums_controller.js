/**
 * Album Controller
 */


const { matchedData, validationResult } = require('express-validator');
const models = require('../models');


/**
 * Get all resources
 
 */


const index = async (req, res) => {

	// query db for user and eager load the albums relation
	let user = null;
	try {
		user = await models.User.fetchById(req.user.data.id, { withRelated: ['albums'] });
	} catch (error) {
		console.error(error);
		res.sendStatus(404);
		return;
	}
	// get this user's album
	const albums = user.related('albums');
	res.send({
		status: 'success',
		data: {
			albums,
		},
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

		//check if user own the album
		if(req.user.id === album.attributes.user_id){
			res.send({
				status: 'success',
				data: {
					album,
				}
			});
		} else {
			res.status(401).send({
				status:'fail',
				data: "sorry, you don't own that album"
			})
		}
}
/**
 *
 * POST /
 */
const store = async (req, res) => {

	// Finds the validation errors in this request and wraps them in an object with handy functions
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("Create album request failed validation:", errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}
	const validData = matchedData(req)
	try {
		const album = await new models.Albums(validData).save({user_id: req.user.attributes.id});
		res.send({
			album
		});
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new user.',
		});
		throw error;
	}
}

const photoToAlbum = async (req, res) => {
	const errors = validationResult(req);

	const allAlbum = await models.Albums.query()
	console.log('this is users id', allAlbum);


	if (!errors.isEmpty()) {
		console.log("Create album request failed validation:", errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}
	try {
		const photo = await models.Photos.fetchById(req.body.photo_id)
		const album = await models.Albums.fetchById(req.params.albumId)

		//check if you own the album when you try to add a photo to an album
		if(photo.attributes.user_id === album.attributes.user_id) {
			const result = await album.photos().attach([photo])
			res.status(201).send({
				status: 'success',
				data: result
			})
		} else {
			res.status(401).send({
				status: 'fail',
				data: "you don't own that album"
			})
		}
	} catch(error){
		res.sendStatus(404)
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
	photoToAlbum,
	update,
	destroy,
}