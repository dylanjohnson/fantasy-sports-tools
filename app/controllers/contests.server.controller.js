'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Contest = mongoose.model('Contest'),
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
				message = 'Contest already exists';
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
 * Create a Contest
 */
exports.create = function(req, res) {
	var contest;

    req.body.lineup = req.body.lineup._id;

    contest = new Contest(req.body);
	contest.user = req.user;

	contest.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(contest);
		}
	});
};

/**
 * Show the current Contest
 */
exports.read = function(req, res) {
	res.jsonp(req.contest);
};

/**
 * Update a Contest
 */
exports.update = function(req, res) {
	var contest = req.contest;

	contest = _.extend(contest, req.body);

	contest.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(contest);
		}
	});
};

/**
 * Delete an Contest
 */
exports.delete = function(req, res) {
	var contest = req.contest;

	contest.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(contest);
		}
	});
};

/**
 * List of Contests
 */
exports.list = function(req, res) {
	Contest
        .find()
        .sort('-created')
        .populate('user', 'displayName')
        .populate('lineup')
        .exec(function(err, contests) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            } else {
                res.jsonp(contests);
            }
        });
};

/**
 * Contest middleware
 */
exports.contestByID = function(req, res, next, id) {
	Contest
        .findById(id)
        .populate('user', 'displayName')
        .populate('lineup')
        .exec(function(err, contest) {
            if (err) return next(err);
            if (!contest) return next(new Error('Failed to load Contest ' + id));
            req.contest = contest;
            next();
        });
};

/**
 * Contest authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.contest.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};
