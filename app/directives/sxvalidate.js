(function () {
    'use strict';

    var app = angular.module('app');

    var errorTag = 'sx-custom';
    var nullFormCtrl = {
        $addControl: angular.noop,
        $removeControl: angular.noop,
        $setValidity: angular.noop,
        $setDirty: angular.noop,
        $setPristine: angular.noop
    };

    app.controller('SxValidateCtrl', ['$attrs', '$element', '$scope',
    function ($attrs, $element, $scope) {
        $scope.iAm = 'SxValidateCtrl';
        $scope.errorTag = $scope.sxErrorTag || errorTag;
    }]);

    function ok() {
        return true;
    }

    function processValidators(valObj, value, ctrl, form) {
        var vabene = true;
        for (var errtag in valObj) {
            var fn = valObj[errtag];
            var rv = fn(value, ctrl, form);
            ctrl.$setValidity(errtag, rv);
            vabene = vabene && !!rv;
        }
        return vabene ? value : null;
    }

    app.directive('sxValidate', ['$timeout', function ($timeout) {
        // Runs during compile
        return {
            // name: '',
            priority: 1000,
            // terminal: true,
            scope: {
                ngModel: '=',
                validator: '&sxValidate',
                sxErrorTag: '@'
            }, // {} = isolate, true = child, false/undefined = no change
            controller: 'SxValidateCtrl',
            require: ['ngModel', '^?form'], // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            // templateUrl: '',
            // replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function ($scope, iElm, iAttrs, ctrls) {
                var modelCtrl = ctrls[0],
					formCtrl = ctrls[1] || nullFormCtrl;

                $scope.modelCtrl = modelCtrl;
                $scope.formCtrl = formCtrl;

                if ($scope.validator && angular.isFunction($scope.validator())) {
                    $scope.validatorObject = $scope.validator()();
                    var validateFnName = $scope.modelCtrl.$name + 'Validate';
                    var validateFn = $scope.validatorObject[validateFnName];
                    $scope.validateFn = ok;
                    if (angular.isFunction(validateFn)) {
                        var temp = {};
                        temp[errorTag] = validateFn;
                        $scope.validateObj = temp;
                    } else if (angular.isObject(validateFn)) {
                        $scope.validateObj = validateFn;
                    }
                }

                var validator = function (value) {
                    if (modelCtrl.$pristine) return value;
                    if (!value) return value;
                    return processValidators($scope.validateObj, value, modelCtrl, formCtrl);
                };

                modelCtrl.$formatters.push(validator);
                modelCtrl.$parsers.push(validator);
            }
        };
    }]);
})();