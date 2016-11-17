var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
	username: String,
	password: String
});

Account.plugin(passportLocalMongoose);

Account.statics.toModel = function (accountObject) {
	return {
		username: accountObject.username,
		token: accountObject._id
	};
};

module.exports = mongoose.model('Account', Account);