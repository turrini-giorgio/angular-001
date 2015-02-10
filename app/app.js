(function(){
	'use strict';

	var app = angular.module('app', [
		'ngResource', 
		'ngSanitize', 
		'ngAnimate', 
		'ngLocale',
		'ui.router', 
		'ui.select2',
		'ui.tinymce',
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
        .state('live', {
        	url: '/live',
			templateUrl: 'app/views/live.html',
			controller: 'LiveCtrl',
        })
        .state('sp', {
        	url: '/sp',
			templateUrl: 'app/views/spview.html',
			controller: 'SpviewCtrl',
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
        .state('tmce', {
        	url: '/tmce',
			templateUrl: 'app/views/tmce.html',
			controller: 'TmceCtrl',
        })
        ;
	}])




})();
