'use strict';

//Contests service used to communicate Contests REST endpoints
angular.module('contests').factory('Contests', ['$resource', function($resource) {
    return $resource('contests/:contestId', {
        contestId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);