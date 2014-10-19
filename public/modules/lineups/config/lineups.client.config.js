'use strict';

// Configuring the Articles module
angular.module('lineups').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Lineups', 'lineups');
		Menus.addMenuItem('topbar', 'New Lineup', 'lineups/create');
	}
]);