'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Lineuptype = mongoose.model('Lineuptype'),
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
				message = 'Lineuptype already exists';
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
 * Create a Lineuptype
 */
exports.create = function(req, res) {
	var lineuptype = new Lineuptype(req.body);
	lineuptype.user = req.user;

	lineuptype.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(lineuptype);
		}
	});
};

/**
 * Show the current Lineuptype
 */
exports.read = function(req, res) {
	res.jsonp(req.lineuptype);
};

/**
 * Update a Lineuptype
 */
exports.update = function(req, res) {
	var lineuptype = req.lineuptype;

	lineuptype = _.extend(lineuptype, req.body);

	lineuptype.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(lineuptype);
		}
	});
};

/**
 * Delete an Lineuptype
 */
exports.delete = function(req, res) {
	var lineuptype = req.lineuptype;

	lineuptype.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(lineuptype);
		}
	});
};

/**
 * List of Lineuptypes
 */
exports.list = function(req, res) {
	Lineuptype.find().sort('-created').populate('user', 'displayName').exec(function(err, lineuptypes) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(lineuptypes);
		}
	});
};

/**
 * Lineuptype middleware
 */
exports.lineuptypeByID = function(req, res, next, id) {
	Lineuptype.findById(id).populate('user', 'displayName').exec(function(err, lineuptype) {
		if (err) return next(err);
		if (!lineuptype) return next(new Error('Failed to load Lineuptype ' + id));
		req.lineuptype = lineuptype;
		next();
	});
};

/**
 * Lineuptype authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.lineuptype.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};