var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('../config/config');

var User = require('../models/User');

module.exports = function(passport) {
	var opts = {
		secretOrKey: config.secret,
		jwtFromRequest: ExtractJwt.fromAuthHeader()
	};
	passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
		User.findOne({id: jwt_payload.id}, function(err, user) {
			if (err) {
				return done(err, false);
			}
			if (user) {
				done(null, user);
			} else {
				done(null, false);
			}
		});
	}));
};