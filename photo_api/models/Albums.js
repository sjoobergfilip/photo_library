/**
 * Author model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('Albums', {
		tableName: 'albums',
		photos() {
			return this.hasMany('Photos');
		},
		users() {
			return this.belongsTo('Users');
		}
	});
}
