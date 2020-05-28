/**
 * User model
 */

const bcrypt = require('bcrypt');

module.exports = (bookshelf) => {
	return bookshelf.model('User', {
		tableName: 'users',
		// albums() {
		// 	return this.hasMany('Albums');
		// }, photos() {
		// 	return this.hasMany('Photos')
		// }
		}, {
		hashSaltRounds: 10,

		fetchById(id, fetchOptions = {}) {
			return new this({ id }).fetch(fetchOptions);
		},

		async login(email, password) {
			// check if user exists
			const user = await new this({ email }).fetch({ require: false });
			if (!user) {
				return false;
			}

			// get hashed password from db
			const hash = user.get('password');
			return (await bcrypt.compare(password, hash))
				? user
				: false;
		},
	});
};
