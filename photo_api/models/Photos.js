/**
 * Book model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('Photos', {
		tableName: 'photo',
		albums() {
			return this.belongsToMany('Albums');
		},
		users() {
			return this.belongsTo('Users');
		}
	}, {
		fetchById(id, fetchOptions = {}) {
			return new this({ id }).fetch(fetchOptions);
		},
	});
}
