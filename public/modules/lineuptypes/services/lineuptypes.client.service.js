'use strict';

//Lineuptypes service used to communicate Lineuptypes REST endpoints
angular.module('lineuptypes').factory('Lineuptypes', ['$resource', function($resource) {
    return $resource('lineuptypes/:lineuptypeId', {
        lineuptypeId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);