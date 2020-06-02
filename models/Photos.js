
module.exports = (bookshelf) => {
    return bookshelf.model('Photos', {
        tableName: 'photos',
        users(){
            return this.belongsTo('User')
        }
    }, {
		fetchById(id, fetchOptions = {}) {
			return new this({ id }).fetch(fetchOptions);
		},
    })
};