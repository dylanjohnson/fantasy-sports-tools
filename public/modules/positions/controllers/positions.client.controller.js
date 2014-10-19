'use strict';

// Positions controller
angular.module('positions').controller('PositionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Positions',
    function($scope, $stateParams, $location, Authentication, Positions) {
        $scope.authentication = Authentication;

        // Create new Position
        $scope.create = function() {
        	// Create new Position object
            var position = new Positions({
                name: this.name,
                abbreviation: this.abbreviation
            });

            // Redirect after save
            position.$save(function(response) {
                $location.path('positions/' + response._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

            // Clear form fields
            this.name = '';
        };

        // Remove existing Position
        $scope.remove = function(position) {
            if (position) {
                position.$remove();

                for (var i in $scope.positions) {
                    if ($scope.positions[i] === position) {
                        $scope.positions.splice(i, 1);
                    }
                }
            } else {
                $scope.position.$remove(function() {
                    $location.path('positions');
                });
            }
        };

        // Update existing Position
        $scope.update = function() {
            var position = $scope.position;

            position.$update(function() {
                $location.path('positions/' + position._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
        };

        // Find a list of Positions
        $scope.find = function() {
            $scope.positions = Positions.query();
        };

        // Find existing Position
        $scope.findOne = function() {
            $scope.position = Positions.get({
                positionId: $stateParams.positionId
            });
        };
    }
]);
