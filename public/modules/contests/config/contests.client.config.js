'use strict';

// Configuring the Articles module
angular.module('contests').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Contests', 'contests');
		Menus.addMenuItem('topbar', 'New Contest', 'contests/create');
	}
]);