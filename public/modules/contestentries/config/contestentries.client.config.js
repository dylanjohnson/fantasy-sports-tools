'use strict';

// Configuring the Articles module
angular.module('contestentries').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Contestentries', 'contestentries');
		Menus.addMenuItem('topbar', 'New Contestentry', 'contestentries/create');
	}
]);