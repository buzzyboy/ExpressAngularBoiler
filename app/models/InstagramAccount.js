var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InstagramAccount = new Schema({
	username: String,
	csrftoken: String,
	ds_user_id: String,
	mid: String
});

module.exports = mongoose.model('InstagramAccount', InstagramAccount);
