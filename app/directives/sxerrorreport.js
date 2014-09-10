(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('SxErrorReportCtrl', ['$attrs', '$element', '$scope',
	function($attrs, $element, $scope){
		$scope.title = $scope.errorTitle || 'ERRORI';
		$scope.formElement = $element.parents('form:first')[0];
		$scope.gotoField = function(field, $event) {
            $event.preventDefault();
            $event.stopPropagation();
            if($scope.formCtrl[field.name]) {
            	console.log($scope.formCtrl[field.name]);
            	var ele = $($scope.formElement).find('input[name=' + field.name + ']');
            	if(ele.length == 0) {
            		ele = $($scope.formElement).find('select[name=' + field.name + ']');
            	}
            	if(ele.length > 0) {
            		ele.focus();
            	}
            }
		}
		$scope.errorMessages = {
			"min": "Il valore di <b>{name}</b> <i>({value})</i> è inferiore al minimo ammesso",
			"max": "Il valore di <b>{name}</b> <i>({value})</i> è maggiore del massimo ammesso",
			"required": "Il campo <b>{name}</b> è obbligatorio",
			"minlength": "Il valore di <b>{name}</b> <i>({value})</i> è più corto del minimo ammesso",
			"maxlength": "Il valore di <b>{name}</b> <i>({value})</i> è più lungo del massimo ammesso"
		};
		if(angular.isDefined($scope.errorDefinition)) {
			angular.extend($scope.errorMessages, $scope.errorDefinition);
		}
		$scope.translateFn = function(errtag, name, value) {
			var formatMessage = function(format, obj) {
				if(!!format) {
					return format.replace(/{(\w+)}/g, function(match, name){
						return typeof obj[name] != 'undefined' ? obj[name] : match;
					});
				}
			};
			var rv = formatMessage($scope.errorMessages[errtag], { name: name, value: value });
			return rv || errtag;
		}
		$scope.translate = function(name, tag) {
			if($scope.translateFn) {
				return $scope.translateFn(tag, name, $scope.formCtrl[name].$viewValue);
			}
			return tag;
		}
		if(angular.isFunction($scope.errorFormat())) {
			$scope.translateFn = $scope.sxErrorFormat();
		}

	}]);

	app.directive('sxErrorReport', ['$timeout', function($timeout){
		function toErrors(errors) {
			var rv = [];
			if(angular.isDefined(errors)) {
				var fields = {};
				for(var ek in errors) {
					var ev = errors[ek];
					if(angular.isArray(ev)) {
						for(var i = 0; i<ev.length; i++) {
							var name = ev[i].$name;
							if(angular.isDefined(fields[name])) {
								fields[name].errors.push(ek);
							} else {
								fields[name] = { name: name, errors: [ek] };
								rv.push(fields[name]);
							}
						}

					}
				}
			}
			return rv;
		}
		// Runs during compile
		return {
			// name: '',
			priority: 1000,
			// terminal: true,
			scope: {
				sxErrorReport: '=',
				errorFormat: '&',
				errorDefinition: '=',
				errorTitle: '='
			}, // {} = isolate, true = child, false/undefined = no change
			controller: 'SxErrorReportCtrl',
			require: ['^form'], // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
			templateUrl: 'app/views/sx.error.report.html',
			// template: '',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, ctrls) {
				var formCtrl = ctrls[0];
				$scope.formCtrl = formCtrl;
				$scope.errors = [];
				$scope.$watch(function() {
					var e = toErrors($scope.formCtrl.$error);
					var rv = angular.toJson(e);
					return rv;
				}, function(newValue, oldValue){
					$scope.errors = JSON.parse(newValue);
					$scope.someErrors = ($scope.errors.length !== 0);
				});
			}
		};
	}]);

})();