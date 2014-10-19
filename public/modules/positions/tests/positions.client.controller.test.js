'use strict';

(function() {
	// Positions Controller Spec
	describe('Positions Controller Tests', function() {
		// Initialize global variables
		var PositionsController,
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

			// Initialize the Positions controller.
			PositionsController = $controller('PositionsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Position object fetched from XHR', inject(function(Positions) {
			// Create sample Position using the Positions service
			var samplePosition = new Positions({
				name: 'New Position'
			});

			// Create a sample Positions array that includes the new Position
			var samplePositions = [samplePosition];

			// Set GET response
			$httpBackend.expectGET('positions').respond(samplePositions);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.positions).toEqualData(samplePositions);
		}));

		it('$scope.findOne() should create an array with one Position object fetched from XHR using a positionId URL parameter', inject(function(Positions) {
			// Define a sample Position object
			var samplePosition = new Positions({
				name: 'New Position'
			});

			// Set the URL parameter
			$stateParams.positionId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/positions\/([0-9a-fA-F]{24})$/).respond(samplePosition);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.position).toEqualData(samplePosition);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Positions) {
			// Create a sample Position object
			var samplePositionPostData = new Positions({
				name: 'New Position'
			});

			// Create a sample Position response
			var samplePositionResponse = new Positions({
				_id: '525cf20451979dea2c000001',
				name: 'New Position'
			});

			// Fixture mock form input values
			scope.name = 'New Position';

			// Set POST response
			$httpBackend.expectPOST('positions', samplePositionPostData).respond(samplePositionResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Position was created
			expect($location.path()).toBe('/positions/' + samplePositionResponse._id);
		}));

		it('$scope.update() should update a valid Position', inject(function(Positions) {
			// Define a sample Position put data
			var samplePositionPutData = new Positions({
				_id: '525cf20451979dea2c000001',
				name: 'New Position'
			});

			// Mock Position in scope
			scope.position = samplePositionPutData;

			// Set PUT response
			$httpBackend.expectPUT(/positions\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/positions/' + samplePositionPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid positionId and remove the Position from the scope', inject(function(Positions) {
			// Create new Position object
			var samplePosition = new Positions({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Positions array and include the Position
			scope.positions = [samplePosition];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/positions\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePosition);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.positions.length).toBe(0);
		}));
	});
}());