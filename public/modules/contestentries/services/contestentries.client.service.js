'use strict';

//Contestentries service used to communicate Contestentries REST endpoints
angular.module('contestentries').factory('Contestentries', ['$resource', function($resource) {
    return $resource('contestentries/:contestentryId', {
        contestentryId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);