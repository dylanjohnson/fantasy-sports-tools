'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Contestentry = mongoose.model('Contestentry'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Contestentry already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Contestentry
 */
exports.create = function(req, res) {
	var contestentry = new Contestentry(req.body);
	contestentry.user = req.user;

	contestentry.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(contestentry);
		}
	});
};

/**
 * Show the current Contestentry
 */
exports.read = function(req, res) {
	res.jsonp(req.contestentry);
};

/**
 * Update a Contestentry
 */
exports.update = function(req, res) {
	var contestentry = req.contestentry;

	contestentry = _.extend(contestentry, req.body);

	contestentry.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(contestentry);
		}
	});
};

/**
 * Delete an Contestentry
 */
exports.delete = function(req, res) {
	var contestentry = req.contestentry;

	contestentry.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(contestentry);
		}
	});
};

/**
 * List of Contestentries
 */
exports.list = function(req, res) {
	Contestentry.find().sort('-created').populate('user', 'displayName').exec(function(err, contestentries) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(contestentries);
		}
	});
};

/**
 * Contestentry middleware
 */
exports.contestentryByID = function(req, res, next, id) {
	Contestentry.findById(id).populate('user', 'displayName').exec(function(err, contestentry) {
		if (err) return next(err);
		if (!contestentry) return next(new Error('Failed to load Contestentry ' + id));
		req.contestentry = contestentry;
		next();
	});
};

/**
 * Contestentry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.contestentry.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};