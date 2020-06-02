/**
 * Author model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('Albums', {
		tableName: 'albums',
		photos() {
			return this.belongsToMany('Photos');
		},
		users(){
			return this.belongsTo('User'); 
		}
		}, {
			fetchById(id, fetchOptions = {}) {
				return new this({ id }).fetch(fetchOptions);
		} 
	});
}
