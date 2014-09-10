(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('ValidateCtrl', ['$scope', '$timeout', function($scope, $timeout){

		$scope.rec = {
			nome: 'Mario',
			cognome: 'Rossi',
			eta: 23,
			sesso: 'M',
		};

		$scope.checkCognome = function(formField) {
			formField.$setValidity('value', (formField.$viewValue !== 'Giga'));
		};


		$scope.validator = function() {
			function etaValidate(value, ctrl) {
				console.log('etaValidate (start): ' + value);
				$timeout(function(){
					console.log('etaValidate (end): ' + value);
					if($scope.rec.nome === 'Mario') {						
						ctrl.$setValidity('sx-custom', value !== 28);
					} else {
						ctrl.$setValidity('sx-custom', value !== 38);
					}
				}, 200);
				return true;
			}
			function nomeValidate(value, ctrl, form) {
				console.log('nomeValidate for ' + value);
				var rv = (value !== 'GGGG');
				if(rv) {
					etaValidate(parseInt(form.eta.$viewValue), form.eta);
					var sessoValid = (sessoValidate(form.sesso.$viewValue, form.sesso, form));
					form.sesso.$setValidity('sx-custom', sessoValid);
					if(sessoValid) {
						$scope.rec.sesso = form.sesso.$viewValue;
					}
				}
				return rv;
			}
			function cognomeValidate(value) {
				console.log('cognomeValidate for ' + value);
				return (value !== 'GGGG');
			}
			function cognomeValidateOne(value) {
				console.log('cognomeValidateOne for ' + value);
				return (value !== 'GGGGA');
			}
			function sessoValidate(value, ctrl, form) {
				var re = /a$/i;
				console.log('sessoValidate for ' + value);
				var m = form.nome.$viewValue.match(re);
				return (value === 'F' && m != null) || (value === 'M' && m == null);
			}

			return {
				who: function() { return 'ValidateCtrl'; },
				nomeValidate: nomeValidate,
				cognomeValidate: { 
					'pippa': cognomeValidate,
					'pipparella': cognomeValidate,
					'pastroccio': cognomeValidateOne 
				},
				etaValidate: etaValidate,
				sessoValidate: sessoValidate
			}

		}

		$scope.errorMessages = {
			"sx-custom": "Il valore di <b>{name}</b> è errato",
			"sex": "Il valore di <b>{name}</b> è scorretto",
			"pippa": "Il valore di <b>{name}</b> è 'na pippa",
			"pipparella": "Il valore di <b>{name}</b> è 'na pipparella'",
			"pastroccio": "Il valore di <b>{name}</b> è un pastrocchio'",
		};


	}]);
})();