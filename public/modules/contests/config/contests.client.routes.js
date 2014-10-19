'use strict';

//Setting up route
angular.module('contests').config(['$stateProvider',
	function($stateProvider) {
		// Contests state routing
		$stateProvider.
		state('listContests', {
			url: '/contests',
			templateUrl: 'modules/contests/views/list-contests.client.view.html'
		}).
		state('createContest', {
			url: '/contests/create',
			templateUrl: 'modules/contests/views/create-contest.client.view.html'
		}).
		state('viewContest', {
			url: '/contests/:contestId',
			templateUrl: 'modules/contests/views/view-contest.client.view.html'
		}).
		state('editContest', {
			url: '/contests/:contestId/edit',
			templateUrl: 'modules/contests/views/edit-contest.client.view.html'
		});
	}
]);