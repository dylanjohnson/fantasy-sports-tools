'use strict';

// Lineuptypes controller
angular.module('lineuptypes').controller('LineuptypesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Lineuptypes',
    function($scope, $stateParams, $location, Authentication, Lineuptypes) {
        $scope.authentication = Authentication;

        // Create new Lineuptype
        $scope.create = function() {
        	// Create new Lineuptype object
            var lineuptype = new Lineuptypes({
                name: this.name
            });

            // Redirect after save
            lineuptype.$save(function(response) {
                $location.path('lineuptypes/' + response._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

            // Clear form fields
            this.name = '';
        };

        // Remove existing Lineuptype
        $scope.remove = function(lineuptype) {
            if (lineuptype) {
                lineuptype.$remove();

                for (var i in $scope.lineuptypes) {
                    if ($scope.lineuptypes[i] === lineuptype) {
                        $scope.lineuptypes.splice(i, 1);
                    }
                }
            } else {
                $scope.lineuptype.$remove(function() {
                    $location.path('lineuptypes');
                });
            }
        };

        // Update existing Lineuptype
        $scope.update = function() {
            var lineuptype = $scope.lineuptype;

            lineuptype.$update(function() {
                $location.path('lineuptypes/' + lineuptype._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
        };

        // Find a list of Lineuptypes
        $scope.find = function() {
            $scope.lineuptypes = Lineuptypes.query();
        };

        // Find existing Lineuptype
        $scope.findOne = function() {
            $scope.lineuptype = Lineuptypes.get({
                lineuptypeId: $stateParams.lineuptypeId
            });
        };
    }
]);