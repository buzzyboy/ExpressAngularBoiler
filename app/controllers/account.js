var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/Account.js');

router.post('/register', function (req, res, next) {
	Account.register(new Account({username: req.body.username}), req.body.password, function (err, account) {
		if (err)
		{
			return res.json({error: err.message});
		}

		passport.authenticate('local')(req, res, function () {
			req.session.save(function (err) {
				if (err)
				{
					return next(err);
				}
				res.json(req.user);
			});
		});
	});
});

router.post('/login', passport.authenticate('local'), function (req, res) {
	var model = Account.toModel(req.user);
	res.json(model);
});

router.get('/me', function (req, res) {
	var model = Account.toModel(req.user);
	res.json(model);
});

module.exports = router;