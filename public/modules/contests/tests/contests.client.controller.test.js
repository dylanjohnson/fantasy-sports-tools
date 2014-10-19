'use strict';

(function() {
	// Contests Controller Spec
	describe('Contests Controller Tests', function() {
		// Initialize global variables
		var ContestsController,
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

			// Initialize the Contests controller.
			ContestsController = $controller('ContestsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Contest object fetched from XHR', inject(function(Contests) {
			// Create sample Contest using the Contests service
			var sampleContest = new Contests({
				name: 'New Contest'
			});

			// Create a sample Contests array that includes the new Contest
			var sampleContests = [sampleContest];

			// Set GET response
			$httpBackend.expectGET('contests').respond(sampleContests);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.contests).toEqualData(sampleContests);
		}));

		it('$scope.findOne() should create an array with one Contest object fetched from XHR using a contestId URL parameter', inject(function(Contests) {
			// Define a sample Contest object
			var sampleContest = new Contests({
				name: 'New Contest'
			});

			// Set the URL parameter
			$stateParams.contestId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/contests\/([0-9a-fA-F]{24})$/).respond(sampleContest);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.contest).toEqualData(sampleContest);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Contests) {
			// Create a sample Contest object
			var sampleContestPostData = new Contests({
				name: 'New Contest'
			});

			// Create a sample Contest response
			var sampleContestResponse = new Contests({
				_id: '525cf20451979dea2c000001',
				name: 'New Contest'
			});

			// Fixture mock form input values
			scope.name = 'New Contest';

			// Set POST response
			$httpBackend.expectPOST('contests', sampleContestPostData).respond(sampleContestResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Contest was created
			expect($location.path()).toBe('/contests/' + sampleContestResponse._id);
		}));

		it('$scope.update() should update a valid Contest', inject(function(Contests) {
			// Define a sample Contest put data
			var sampleContestPutData = new Contests({
				_id: '525cf20451979dea2c000001',
				name: 'New Contest'
			});

			// Mock Contest in scope
			scope.contest = sampleContestPutData;

			// Set PUT response
			$httpBackend.expectPUT(/contests\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/contests/' + sampleContestPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid contestId and remove the Contest from the scope', inject(function(Contests) {
			// Create new Contest object
			var sampleContest = new Contests({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Contests array and include the Contest
			scope.contests = [sampleContest];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/contests\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleContest);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.contests.length).toBe(0);
		}));
	});
}());