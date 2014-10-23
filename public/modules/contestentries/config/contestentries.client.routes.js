'use strict';

//Setting up route
angular.module('contestentries').config(['$stateProvider',
	function($stateProvider) {
		// Contestentries state routing
		$stateProvider.
		state('listContestentries', {
			url: '/contestentries',
			templateUrl: 'modules/contestentries/views/list-contestentries.client.view.html'
		}).
		state('createContestentry', {
			url: '/contestentries/create',
			templateUrl: 'modules/contestentries/views/create-contestentry.client.view.html'
		}).
		state('viewContestentry', {
			url: '/contestentries/:contestentryId',
			templateUrl: 'modules/contestentries/views/view-contestentry.client.view.html'
		}).
		state('editContestentry', {
			url: '/contestentries/:contestentryId/edit',
			templateUrl: 'modules/contestentries/views/edit-contestentry.client.view.html'
		});
	}
]);