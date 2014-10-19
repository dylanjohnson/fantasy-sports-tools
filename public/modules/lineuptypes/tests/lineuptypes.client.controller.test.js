'use strict';

(function() {
	// Lineuptypes Controller Spec
	describe('Lineuptypes Controller Tests', function() {
		// Initialize global variables
		var LineuptypesController,
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

			// Initialize the Lineuptypes controller.
			LineuptypesController = $controller('LineuptypesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Lineuptype object fetched from XHR', inject(function(Lineuptypes) {
			// Create sample Lineuptype using the Lineuptypes service
			var sampleLineuptype = new Lineuptypes({
				name: 'New Lineuptype'
			});

			// Create a sample Lineuptypes array that includes the new Lineuptype
			var sampleLineuptypes = [sampleLineuptype];

			// Set GET response
			$httpBackend.expectGET('lineuptypes').respond(sampleLineuptypes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.lineuptypes).toEqualData(sampleLineuptypes);
		}));

		it('$scope.findOne() should create an array with one Lineuptype object fetched from XHR using a lineuptypeId URL parameter', inject(function(Lineuptypes) {
			// Define a sample Lineuptype object
			var sampleLineuptype = new Lineuptypes({
				name: 'New Lineuptype'
			});

			// Set the URL parameter
			$stateParams.lineuptypeId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/lineuptypes\/([0-9a-fA-F]{24})$/).respond(sampleLineuptype);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.lineuptype).toEqualData(sampleLineuptype);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Lineuptypes) {
			// Create a sample Lineuptype object
			var sampleLineuptypePostData = new Lineuptypes({
				name: 'New Lineuptype'
			});

			// Create a sample Lineuptype response
			var sampleLineuptypeResponse = new Lineuptypes({
				_id: '525cf20451979dea2c000001',
				name: 'New Lineuptype'
			});

			// Fixture mock form input values
			scope.name = 'New Lineuptype';

			// Set POST response
			$httpBackend.expectPOST('lineuptypes', sampleLineuptypePostData).respond(sampleLineuptypeResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Lineuptype was created
			expect($location.path()).toBe('/lineuptypes/' + sampleLineuptypeResponse._id);
		}));

		it('$scope.update() should update a valid Lineuptype', inject(function(Lineuptypes) {
			// Define a sample Lineuptype put data
			var sampleLineuptypePutData = new Lineuptypes({
				_id: '525cf20451979dea2c000001',
				name: 'New Lineuptype'
			});

			// Mock Lineuptype in scope
			scope.lineuptype = sampleLineuptypePutData;

			// Set PUT response
			$httpBackend.expectPUT(/lineuptypes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/lineuptypes/' + sampleLineuptypePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid lineuptypeId and remove the Lineuptype from the scope', inject(function(Lineuptypes) {
			// Create new Lineuptype object
			var sampleLineuptype = new Lineuptypes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Lineuptypes array and include the Lineuptype
			scope.lineuptypes = [sampleLineuptype];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/lineuptypes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleLineuptype);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.lineuptypes.length).toBe(0);
		}));
	});
}());