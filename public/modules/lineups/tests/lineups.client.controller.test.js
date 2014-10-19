'use strict';

(function() {
	// Lineups Controller Spec
	describe('Lineups Controller Tests', function() {
		// Initialize global variables
		var LineupsController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Lineups controller.
			LineupsController = $controller('LineupsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Lineup object fetched from XHR', inject(function(Lineups) {
			// Create sample Lineup using the Lineups service
			var sampleLineup = new Lineups({
				name: 'New Lineup'
			});

			// Create a sample Lineups array that includes the new Lineup
			var sampleLineups = [sampleLineup];

			// Set GET response
			$httpBackend.expectGET('lineups').respond(sampleLineups);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.lineups).toEqualData(sampleLineups);
		}));

		it('$scope.findOne() should create an array with one Lineup object fetched from XHR using a lineupId URL parameter', inject(function(Lineups) {
			// Define a sample Lineup object
			var sampleLineup = new Lineups({
				name: 'New Lineup'
			});

			// Set the URL parameter
			$stateParams.lineupId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/lineups\/([0-9a-fA-F]{24})$/).respond(sampleLineup);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.lineup).toEqualData(sampleLineup);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Lineups) {
			// Create a sample Lineup object
			var sampleLineupPostData = new Lineups({
				name: 'New Lineup'
			});

			// Create a sample Lineup response
			var sampleLineupResponse = new Lineups({
				_id: '525cf20451979dea2c000001',
				name: 'New Lineup'
			});

			// Fixture mock form input values
			scope.name = 'New Lineup';

			// Set POST response
			$httpBackend.expectPOST('lineups', sampleLineupPostData).respond(sampleLineupResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Lineup was created
			expect($location.path()).toBe('/lineups/' + sampleLineupResponse._id);
		}));

		it('$scope.update() should update a valid Lineup', inject(function(Lineups) {
			// Define a sample Lineup put data
			var sampleLineupPutData = new Lineups({
				_id: '525cf20451979dea2c000001',
				name: 'New Lineup'
			});

			// Mock Lineup in scope
			scope.lineup = sampleLineupPutData;

			// Set PUT response
			$httpBackend.expectPUT(/lineups\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/lineups/' + sampleLineupPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid lineupId and remove the Lineup from the scope', inject(function(Lineups) {
			// Create new Lineup object
			var sampleLineup = new Lineups({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Lineups array and include the Lineup
			scope.lineups = [sampleLineup];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/lineups\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleLineup);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.lineups.length).toBe(0);
		}));
	});
}());