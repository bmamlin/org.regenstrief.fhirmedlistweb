//var fhirApp = angular.module('fhirApp', []);

fhirApp.controller('PatientsCtrl', function ($rootScope, $scope, $http) {
	$http.get('data/patients.json').success(function(data) {
		$scope.patients = data;
	});
	
	$scope.selectPatient = function(patient) {
		$rootScope.patient = patient;
		$rootScope.$broadcast('patientSelected', patient);
	};

});