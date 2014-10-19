'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var lineuptypes = require('../../app/controllers/lineuptypes');

	// Lineuptypes Routes
	app.route('/lineuptypes')
		.get(lineuptypes.list)
		.post(users.requiresLogin, lineuptypes.create);
	
	app.route('/lineuptypes/:lineuptypeId')
		.get(lineuptypes.read)
		.put(users.requiresLogin, lineuptypes.hasAuthorization, lineuptypes.update)
	    .delete(users.requiresLogin, lineuptypes.hasAuthorization, lineuptypes.delete);

	// Finish by binding the Lineuptype middleware
	app.param('lineuptypeId', lineuptypes.lineuptypeByID);
};