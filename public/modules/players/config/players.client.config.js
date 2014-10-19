'use strict';

// Configuring the Articles module
angular.module('players').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Players', 'players');
		Menus.addMenuItem('topbar', 'New Player', 'players/create');
	}
]);