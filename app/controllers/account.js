var express = require('express');
var jwt = require('jwt-simple');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User.js');
var config = require("../config/config.js");

router.post('/register', function (req, res) {
	if (!req.body.username || !req.body.password)
	{
		res.status(400).json({success: false, message: "Missing username or password."});
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
				console.log("err", err);
				return res.status(400).json({success: false, message: "Username already exists."});
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
			res.status(400).send({success: false, message: 'User not found'});
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
					res.status(400).send({success: false, message: 'Authentication failed. Wrong password.'});
				}
			});
		}
	});
});

router.get('/logout', function (req, res) {
	req.logout();
	res.send(true);
});

router.get('/me', passport.authenticate('jwt', {session: false}), function (req, res) {
	var token = getToken(req.headers);
	if (token)
	{
		var decoded = jwt.decode(token, config.secret);
		User.findOne({
			username: decoded.username
		}, function (err, user) {
			if (err) throw err;

			if (!user)
			{
				return res.status(403).send({success: false, message: 'Authentication failed. User not found.'});
			}
			else
			{
				res.json({success: true, user: user.toModel()});
			}
		});
	}
	else
	{
		return res.status(403).send({success: false, message: 'No token provided.'});
	}
});

/**
 * @param {{authorization:String}} headers
 * @returns {String|null}
 */
function getToken (headers) {
	if (headers && headers.authorization)
	{
		var parted = headers.authorization.split(' ');
		if (parted.length === 2)
		{
			return parted[1];
		}
		else
		{
			return null;
		}
	}
	else
	{
		return null;
	}
}

module.exports = router;