//var fhirApp = angular.module('fhirApp', ['ngTouch'])

fhirApp.controller('MainCtrl', function($rootScope, $scope, $http, meds) {

	$rootScope.reviewing = false;

	$scope.$on('patientSelected', function(event, patient) {
		$scope.patient = patient;
	});

	$scope.review = function() {
		$rootScope.reviewing = true;
	}

	$scope.closeReview = function() {
		$rootScope.reviewing = false;
	}

	$scope.clearPatient = function() {
		$rootScope.patient = null;
		$scope.patient = null;
		meds.clear();
		$rootScope.reviewing = false;
	}

});