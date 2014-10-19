'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var lineups = require('../../app/controllers/lineups');

	// Lineups Routes
	app.route('/lineups')
		.get(lineups.list)
		.post(users.requiresLogin, lineups.create);
	
	app.route('/lineups/:lineupId')
		.get(lineups.read)
		.put(users.requiresLogin, lineups.hasAuthorization, lineups.update)
	    .delete(users.requiresLogin, lineups.hasAuthorization, lineups.delete);

	// Finish by binding the Lineup middleware
	app.param('lineupId', lineups.lineupByID);
};