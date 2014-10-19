'use strict';

// Contests controller
angular.module('contests').controller('ContestsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Contests',
    function($scope, $stateParams, $location, Authentication, Contests) {
        $scope.authentication = Authentication;

        // Create new Contest
        $scope.create = function() {
        	// Create new Contest object
            var contest = new Contests({
                name: this.name
            });

            // Redirect after save
            contest.$save(function(response) {
                $location.path('contests/' + response._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

            // Clear form fields
            this.name = '';
        };

        // Remove existing Contest
        $scope.remove = function(contest) {
            if (contest) {
                contest.$remove();

                for (var i in $scope.contests) {
                    if ($scope.contests[i] === contest) {
                        $scope.contests.splice(i, 1);
                    }
                }
            } else {
                $scope.contest.$remove(function() {
                    $location.path('contests');
                });
            }
        };

        // Update existing Contest
        $scope.update = function() {
            var contest = $scope.contest;

            contest.$update(function() {
                $location.path('contests/' + contest._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
        };

        // Find a list of Contests
        $scope.find = function() {
            $scope.contests = Contests.query();
        };

        // Find existing Contest
        $scope.findOne = function() {
            $scope.contest = Contests.get({
                contestId: $stateParams.contestId
            });
        };
    }
]);