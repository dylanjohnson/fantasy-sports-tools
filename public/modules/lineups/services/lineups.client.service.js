'use strict';

//Lineups service used to communicate Lineups REST endpoints
angular.module('lineups').factory('Lineups', ['$resource', function($resource) {
    return $resource('lineups/:lineupId', {
        lineupId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);