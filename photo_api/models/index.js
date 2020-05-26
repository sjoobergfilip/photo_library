// Setting up the database connection
const knex = require('knex')({
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST || 'localhost',
		port: process.env.DB_PORT || 3306,
		user: process.env.DB_USER || 'root',
		password: process.env.DB_PASSWORD || '',
		database: process.env.DB_NAME || 'photo_libary',
	}
});

const bookshelf = require('bookshelf')(knex);


const Albums = require('./Albums')(bookshelf);
const Photos = require('./Photos')(bookshelf);
const User = require('./User')(bookshelf);


module.exports = {
	bookshelf,
	Albums,
	Photos,
	User,

};
