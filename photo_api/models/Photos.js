
module.exports = (bookshelf) => {
    return bookshelf.model('Photos', {
        tableName: 'photos',
    })
};