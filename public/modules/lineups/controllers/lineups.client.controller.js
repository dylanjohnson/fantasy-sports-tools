'use strict';

// Lineups controller
angular.module('lineups').controller('LineupsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Lineups', 'Players',
    function($scope, $stateParams, $location, Authentication, Lineups, Players) {
        $scope.authentication = Authentication;

        $scope.players = Players.query();

        $scope.selectedPlayers = [];

        // Create new Lineup
        $scope.create = function() {
        	// Create new Lineup object
            var lineup = new Lineups({
                name: this.name,
                players: $scope.selectedPlayers
            });

            // Redirect after save
            lineup.$save(function(response) {
                $location.path('lineups/' + response._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

            // Clear form fields
            this.name = '';
        };

        // Remove existing Lineup
        $scope.remove = function(lineup) {
            if (lineup) {
                lineup.$remove();

                for (var i in $scope.lineups) {
                    if ($scope.lineups[i] === lineup) {
                        $scope.lineups.splice(i, 1);
                    }
                }
            } else {
                $scope.lineup.$remove(function() {
                    $location.path('lineups');
                });
            }
        };

        // Update existing Lineup
        $scope.update = function() {
            var lineup = $scope.lineup;

            lineup.$update(function() {
                $location.path('lineups/' + lineup._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
        };

        // Find a list of Lineups
        $scope.find = function() {
            $scope.lineups = Lineups.query();
        };

        // Find existing Lineup
        $scope.findOne = function() {
            $scope.lineup = Lineups.get({
                lineupId: $stateParams.lineupId
            });
        };

        $scope.handlePlayerSelectionChange = function (player) {
            player.selected ? $scope.selectedPlayers.push(player) : removePlayer(player);
        };

        function removePlayer(player) {
            $scope.selectedPlayers = _.filter($scope.selectedPlayers, function (selected) {
                return selected._id !== player._id;
            });
        }
    }
]);
