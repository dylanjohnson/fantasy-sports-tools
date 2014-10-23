'use strict';

// Contestentries controller
angular.module('contestentries').controller('ContestentriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Contestentries',
    function($scope, $stateParams, $location, Authentication, Contestentries) {
        $scope.authentication = Authentication;

        // Create new Contestentry
        $scope.create = function() {
        	// Create new Contestentry object
            var contestentry = new Contestentries({
                name: this.name
            });

            // Redirect after save
            contestentry.$save(function(response) {
                $location.path('contestentries/' + response._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

            // Clear form fields
            this.name = '';
        };

        // Remove existing Contestentry
        $scope.remove = function(contestentry) {
            if (contestentry) {
                contestentry.$remove();

                for (var i in $scope.contestentries) {
                    if ($scope.contestentries[i] === contestentry) {
                        $scope.contestentries.splice(i, 1);
                    }
                }
            } else {
                $scope.contestentry.$remove(function() {
                    $location.path('contestentries');
                });
            }
        };

        // Update existing Contestentry
        $scope.update = function() {
            var contestentry = $scope.contestentry;

            contestentry.$update(function() {
                $location.path('contestentries/' + contestentry._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
        };

        // Find a list of Contestentries
        $scope.find = function() {
            $scope.contestentries = Contestentries.query();
        };

        // Find existing Contestentry
        $scope.findOne = function() {
            $scope.contestentry = Contestentries.get({
                contestentryId: $stateParams.contestentryId
            });
        };
    }
]);