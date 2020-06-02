/**
 * Authentication middleware
 */

const { User } = require('../../models');

const basic = async (req, res, next) => {
	// check if Authorization header exists, otherwise bail
	if (!req.headers.authorization) {
		res.status(401).send({
			status: 'fail',
			data: 'Authorization required',
		});
		return;
	}
	
	const [authSchema, base64Payload] = req.headers.authorization.split(' ');

	if (authSchema.toLowerCase() !== "basic") {
		// not ours to authenticate
		next();
	}

	const decodedPayload = Buffer.from(base64Payload, 'base64').toString('ascii');

	// kalle:omg-food
	const [username, password] = decodedPayload.split(':');

	const user = await User.login(username, password);
	if (!user) {
		res.status(401).send({
			status: 'fail',
			data: 'Authorization failed',
		});
		return;
	}

	// now that we have authenticated the user and know that he/she/it is who it claims to be
	// attach the user object to the request, so that other parts of the api can use the user
	req.user = user;
	req.user.data = { id: user.get('id') }

	next();
}

module.exports = {
	basic,
}
