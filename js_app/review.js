//var fhirApp = angular.module('fhirApp', ['ngTouch'])

fhirApp.controller('ReviewCtrl', function($rootScope, $scope, meds) {

	$scope.$watch(meds.list, function() {
		$scope.meds = meds.list();
	});

});