'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var contests = require('../../app/controllers/contests');

	// Contests Routes
	app.route('/contests')
		.get(contests.list)
		.post(users.requiresLogin, contests.create);
	
	app.route('/contests/:contestId')
		.get(contests.read)
		.put(users.requiresLogin, contests.hasAuthorization, contests.update)
	    .delete(users.requiresLogin, contests.hasAuthorization, contests.delete);

	// Finish by binding the Contest middleware
	app.param('contestId', contests.contestByID);
};