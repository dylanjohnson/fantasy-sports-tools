'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Lineup = mongoose.model('Lineup'),
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
				message = 'Lineup already exists';
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
 * Create a Lineup
 */
exports.create = function(req, res) {
    req.body.players = req.body.players.map(function (player) {
        return player._id;
    });

	var lineup = new Lineup(req.body);
	lineup.user = req.user;

    console.log('lineup: ', lineup);

	lineup.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(lineup);
		}
	});
};

/**
 * Show the current Lineup
 */
exports.read = function(req, res) {
	res.jsonp(req.lineup);
};

/**
 * Update a Lineup
 */
exports.update = function(req, res) {
	var lineup = req.lineup;

	lineup = _.extend(lineup, req.body);

	lineup.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(lineup);
		}
	});
};

/**
 * Delete an Lineup
 */
exports.delete = function(req, res) {
	var lineup = req.lineup;

	lineup.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(lineup);
		}
	});
};

/**
 * List of Lineups
 */
exports.list = function(req, res) {
	Lineup
        .find()
        .sort('-created')
        .populate('user', 'displayName')
        .populate('players')
        .exec(function(err, lineups) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            } else {
                res.jsonp(lineups);
            }
        });
};

/**
 * Lineup middleware
 */
exports.lineupByID = function(req, res, next, id) {
	Lineup
        .findById(id)
        .populate('user', 'displayName')
        .populate('players')
        .exec(function(err, lineup) {
            if (err) return next(err);
            if (!lineup) return next(new Error('Failed to load Lineup ' + id));
            req.lineup = lineup;
            next();
        });
};

/**
 * Lineup authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.lineup.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};
