(function(){
	'use strict';

	var app = angular.module('app', [
		'ngResource', 
		'ngSanitize', 
		'ngAnimate', 
		'ngLocale',
		'ui.router', 
		'ui.select2',
	]);

	app.config(['$stateProvider', '$urlRouterProvider', 
	function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
        .state('main', {
        	url: '/',
			templateUrl: 'app/views/main.html',
			controller: 'MainCtrl',
        })
        .state('validate', {
        	url: '/val',
			templateUrl: 'app/views/validate.html',
			controller: 'ValidateCtrl',
        })
        .state('center', {
        	url: '/cen',
			templateUrl: 'app/views/center.html',
			controller: 'CenterCtrl',
        })
        ;
	}])




})();
