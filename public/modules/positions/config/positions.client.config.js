'use strict';

// Configuring the Articles module
angular.module('positions').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Positions', 'positions');
		Menus.addMenuItem('topbar', 'New Position', 'positions/create');
	}
]);