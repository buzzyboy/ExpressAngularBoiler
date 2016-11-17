/**
 * Created by cody on 11/16/16.
 */

(function () {
	"use strict";
	
	angular.module('Instafollowr', [
		'ui.router'
	]);

	angular
		.module('Instafollowr')
		.config(initRoutes);

	initRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];
	function initRoutes ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');
		$stateProvider.state({
			name: 'home',
			url: '/home',
			views: {
				'main@': {
					templateUrl: 'src/home/views/home.html'
				}
			}
		});
	}
})();