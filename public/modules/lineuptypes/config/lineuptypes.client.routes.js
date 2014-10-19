'use strict';

//Setting up route
angular.module('lineuptypes').config(['$stateProvider',
	function($stateProvider) {
		// Lineuptypes state routing
		$stateProvider.
		state('listLineuptypes', {
			url: '/lineuptypes',
			templateUrl: 'modules/lineuptypes/views/list-lineuptypes.client.view.html'
		}).
		state('createLineuptype', {
			url: '/lineuptypes/create',
			templateUrl: 'modules/lineuptypes/views/create-lineuptype.client.view.html'
		}).
		state('viewLineuptype', {
			url: '/lineuptypes/:lineuptypeId',
			templateUrl: 'modules/lineuptypes/views/view-lineuptype.client.view.html'
		}).
		state('editLineuptype', {
			url: '/lineuptypes/:lineuptypeId/edit',
			templateUrl: 'modules/lineuptypes/views/edit-lineuptype.client.view.html'
		});
	}
]);