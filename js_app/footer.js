//var fhirApp = angular.module('fhirApp', ['ngTouch'])

fhirApp.controller('FooterCtrl', function($rootScope, $scope, meds) {

	$scope.$watch(meds.list, function() {
		$scope.meds = meds.list();
	});
	$scope.$watch(meds.currentMed, function() {
		$scope.currentMed = meds.currentMed();
	});

	$scope.prev = function() {
		meds.prev();
	}

	$scope.next = function() {
		meds.next();
	}

});