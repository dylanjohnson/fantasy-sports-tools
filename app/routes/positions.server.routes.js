'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var positions = require('../../app/controllers/positions');

	// Positions Routes
	app.route('/positions')
		.get(positions.list)
		.post(users.requiresLogin, positions.create);
	
	app.route('/positions/:positionId')
		.get(positions.read)
		.put(users.requiresLogin, positions.hasAuthorization, positions.update)
	    .delete(users.requiresLogin, positions.hasAuthorization, positions.delete);

	// Finish by binding the Position middleware
	app.param('positionId', positions.positionByID);
};