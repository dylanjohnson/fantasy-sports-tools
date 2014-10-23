'use strict';

(function() {
	// Contestentries Controller Spec
	describe('Contestentries Controller Tests', function() {
		// Initialize global variables
		var ContestentriesController,
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

			// Initialize the Contestentries controller.
			ContestentriesController = $controller('ContestentriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Contestentry object fetched from XHR', inject(function(Contestentries) {
			// Create sample Contestentry using the Contestentries service
			var sampleContestentry = new Contestentries({
				name: 'New Contestentry'
			});

			// Create a sample Contestentries array that includes the new Contestentry
			var sampleContestentries = [sampleContestentry];

			// Set GET response
			$httpBackend.expectGET('contestentries').respond(sampleContestentries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.contestentries).toEqualData(sampleContestentries);
		}));

		it('$scope.findOne() should create an array with one Contestentry object fetched from XHR using a contestentryId URL parameter', inject(function(Contestentries) {
			// Define a sample Contestentry object
			var sampleContestentry = new Contestentries({
				name: 'New Contestentry'
			});

			// Set the URL parameter
			$stateParams.contestentryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/contestentries\/([0-9a-fA-F]{24})$/).respond(sampleContestentry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.contestentry).toEqualData(sampleContestentry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Contestentries) {
			// Create a sample Contestentry object
			var sampleContestentryPostData = new Contestentries({
				name: 'New Contestentry'
			});

			// Create a sample Contestentry response
			var sampleContestentryResponse = new Contestentries({
				_id: '525cf20451979dea2c000001',
				name: 'New Contestentry'
			});

			// Fixture mock form input values
			scope.name = 'New Contestentry';

			// Set POST response
			$httpBackend.expectPOST('contestentries', sampleContestentryPostData).respond(sampleContestentryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Contestentry was created
			expect($location.path()).toBe('/contestentries/' + sampleContestentryResponse._id);
		}));

		it('$scope.update() should update a valid Contestentry', inject(function(Contestentries) {
			// Define a sample Contestentry put data
			var sampleContestentryPutData = new Contestentries({
				_id: '525cf20451979dea2c000001',
				name: 'New Contestentry'
			});

			// Mock Contestentry in scope
			scope.contestentry = sampleContestentryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/contestentries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/contestentries/' + sampleContestentryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid contestentryId and remove the Contestentry from the scope', inject(function(Contestentries) {
			// Create new Contestentry object
			var sampleContestentry = new Contestentries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Contestentries array and include the Contestentry
			scope.contestentries = [sampleContestentry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/contestentries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleContestentry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.contestentries.length).toBe(0);
		}));
	});
}());