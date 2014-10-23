'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var contestentries = require('../../app/controllers/contestentries');

	// Contestentries Routes
	app.route('/contestentries')
		.get(contestentries.list)
		.post(users.requiresLogin, contestentries.create);
	
	app.route('/contestentries/:contestentryId')
		.get(contestentries.read)
		.put(users.requiresLogin, contestentries.hasAuthorization, contestentries.update)
	    .delete(users.requiresLogin, contestentries.hasAuthorization, contestentries.delete);

	// Finish by binding the Contestentry middleware
	app.param('contestentryId', contestentries.contestentryByID);
};