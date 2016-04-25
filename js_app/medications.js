var fhirApp = angular.module('fhirApp', ['ngTouch']);

fhirApp.factory('meds', function() {
	var list;
	var currentMed = 0;
	var medService = {};

	medService.list = function() {
		return list;
	};

	medService.setList = function(newList) {
		list = newList;
	};

	medService.currentMed = function() {
		return currentMed;
	}

	medService.prev = function() {
		if (currentMed > 0) {
			currentMed -= 1;
			setTimeout(function() {
				$('#content').scrollTop(0);
			}, 0);
		}
	};

	medService.next = function() {
		var temp = list;
		temp.sort(function(a,b) {
			if (a.medClinicalName < b.medClinicalName)
				return -1;
			else if (a.medClinicalName > b.medClinicalName)
				return 1;
			else
				return 0;
		});
		if (currentMed < list.length - 1 && temp[currentMed].action) {
			currentMed += 1;
			setTimeout(function() {
				$('#content').scrollTop(0);
			}, 0);
		}
	};

	medService.clear = function() {
		list = null;
		currentMed = 0;
	}

	return medService;
});

fhirApp.controller('MedicationsCtrl', function ($rootScope, $scope, $http, $swipe, meds) {

	$scope.$watch(meds.list, function() {
		$scope.meds = meds.list();
	});
	$scope.$watch(meds.currentMed, function() {
		$scope.currentMed = meds.currentMed();
	});

	$scope.$on('patientSelected', function(event, patient) {
		//$http.get("service/patientMedications?patientGivenName=" + patient.given + "&patientFamilyName=" + patient.family).success(function(data) {
		$http.get("data/patientMedications_" + patient.given + "_" + patient.family + ".json").success(function(data) {
			meds.setList(data);
			for (var i = 0; i < data.length; i++) {
				$scope.loadImage(data[i]);
				$scope.loadIndications(data[i]);
			}
		});
	});

	$scope.loadImage = function(med) {
		if (med.rxcui) {
			//$http.get("service/medicationImage?rxcui=" + med.rxcui).success((function(med) {
			$http.get("data/medicationImage_" + med.rxcui + ".json").success((function(med) {
				return function(data) {
					if (data && data.length > 0) {
						med.imageURL = data[0];
					}
				}
			})(med));
		}
	};

	$scope.loadIndications = function(med) {
		if (med.rxcui) {
			//$http.get("service/fdadrugapi/byRXCUI/" + med.rxcui).success((function(med) {
			$http.get("data/fdadrugapi_" + med.rxcui + ".json").success((function(med) {
				return function(data) {
					if (data && data.length > 0) {
						med.indications = data;
					}
				}
			})(med));
		}
	};

	$scope.yes = function(med) {
		med.action = 'yes';
		med.actionClass = ['medAction-active','medAction-inactive','medAction-inactive'];
		med.confirmClass = 'med-confirmed';
		setTimeout(function() {
			$('#content').animate({scrollTop: 500}, "slow");
		}, 0);
	};

	$scope.no = function(med) {
		med.action = 'no';
		med.actionClass = ['medAction-inactive','medAction-active','medAction-inactive'];
		med.confirmClass = 'med-denied';
		setTimeout(function() {
			$('#content').animate({scrollTop: 500}, "slow");
		}, 0);
	};

	$scope.dunno = function(med) {
		med.action = 'dunno';
		med.actionClass = ['medAction-inactive','medAction-inactive','medAction-active'];
		med.confirmClass = 'med-unknown';
	};

	$scope.actionClass = function(med, btn) {
		return (!med.action || med.action == btn ?
			'medAction-active' : 'medAction-inactive');
	};

	$scope.refill = function(med) {
		med.refill = 1;
		med.refillClass = ['medAction-active', 'medAction-inactive']
	};

	$scope.noRefill = function(med) {
		med.refill = 0;
		med.refillClass = ['medAction-inactive', 'medAction-active']
	};

	$scope.prev = function() {
		meds.prev();
	};

	$scope.next = function() {
		meds.next();
	};

  $scope.toTitleCase = function(str) {
      return str.replace(/(?:^|\s)\w/g, function(match) {
          return match.toUpperCase();
      });
  }

});
