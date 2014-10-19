'use strict';

//Setting up route
angular.module('lineups').config(['$stateProvider',
	function($stateProvider) {
		// Lineups state routing
		$stateProvider.
		state('listLineups', {
			url: '/lineups',
			templateUrl: 'modules/lineups/views/list-lineups.client.view.html'
		}).
		state('createLineup', {
			url: '/lineups/create',
			templateUrl: 'modules/lineups/views/create-lineup.client.view.html'
		}).
		state('viewLineup', {
			url: '/lineups/:lineupId',
			templateUrl: 'modules/lineups/views/view-lineup.client.view.html'
		}).
		state('editLineup', {
			url: '/lineups/:lineupId/edit',
			templateUrl: 'modules/lineups/views/edit-lineup.client.view.html'
		});
	}
]);