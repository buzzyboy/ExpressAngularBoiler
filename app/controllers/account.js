var express = require('express');
var jwt = require('jwt-simple');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User.js');
var config = require("../config/config.js");

router.post('/register', function (req, res, next) {
	if (!req.body.username || !req.body.password)
	{
		res.json({success: false, message: "Missing username or password."});
	}
	else
	{
		var newUser = new User({
			username: req.body.username,
			password: req.body.password
		});
		newUser.save(function (err) {
			if (err)
			{
				return res.json({success: false, message: "Username already exists."});
			}
			res.json({success: true, message: "Successfully created new user"});
		});
	}
});

router.post('/login', function (req, res) {
	User.findOne({
		username: req.body.username
	}, function (err, user) {
		if (err) throw err;

		if (!user)
		{
			res.send({success: false, msg: 'Authentication failed. User not found. Username: ' + req.body.username});
		}
		else
		{
			// check if password matches
			user.comparePassword(req.body.password, function (err, isMatch) {
				if (isMatch && !err)
				{
					// if user is found and password is right create a token
					var token = jwt.encode(user, config.secret);
					// return the information including token as JSON
					res.json({success: true, token: 'JWT ' + token});
				}
				else
				{
					res.send({success: false, msg: 'Authentication failed. Wrong password.'});
				}
			});
		}
	});
});

router.get('/logout', function (req, res) {
	req.logout();
	res.send(true);
});

router.get('/me', passport.authenticate('jwt', { session: false}), function(req, res) {
	var token = getToken(req.headers);
	if (token) {
		var decoded = jwt.decode(token, config.secret);
		User.findOne({
			name: decoded.name
		}, function(err, user) {
			if (err) throw err;

			if (!user) {
				return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
			} else {
				res.json({success: true, msg: 'Welcome in the member area ' + user.username + '!'});
			}
		});
	} else {
		return res.status(403).send({success: false, msg: 'No token provided.'});
	}
});

getToken = function (headers) {
	if (headers && headers.authorization) {
		var parted = headers.authorization.split(' ');
		if (parted.length === 2) {
			return parted[1];
		} else {
			return null;
		}
	} else {
		return null;
	}
};
module.exports = router;