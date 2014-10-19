'use strict';

//Positions service used to communicate Positions REST endpoints
angular.module('positions').factory('Positions', ['$resource', function($resource) {
    return $resource('positions/:positionId', {
        positionId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);