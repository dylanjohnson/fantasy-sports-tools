'use strict';

// Configuring the Articles module
angular.module('lineuptypes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Lineuptypes', 'lineuptypes');
		Menus.addMenuItem('topbar', 'New Lineuptype', 'lineuptypes/create');
	}
]);