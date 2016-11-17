/**
 * Created by cody on 11/17/16.
 */

(function () {
	"use strict";

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
					templateUrl: 'src/states/home/views/home.html'
				},
				'navbarHome@home': {
					templateUrl: 'src/states/home/views/navbar.html'
				}
			},
			resolve: {
				authenticated: authenticated
			}
		});

		$stateProvider.state({
			name: 'login',
			url: '/login',
			views: {
				'main@': {
					templateUrl: 'src/states/login/views/login.html'
				}
			},
			resolve: {
				unauthenticated: unauthenticated
			}
		});

		authenticated.$inject = ['$q', '$timeout', '$state', 'AuthService'];
		function authenticated ($q, $timeout, $state, AuthService) {
			if (AuthService.isAuthenticated())
			{
				return $q.when();
			}
			else
			{
				$timeout(function () {
					$state.go('login');
				});
				return $q.reject();
			}
		}
		unauthenticated.$inject = ['$q', '$timeout', '$state', 'AuthService'];
		function unauthenticated ($q, $timeout, $state, AuthService) {
			if (!AuthService.isAuthenticated())
			{
				return $q.when();
			}
			else
			{
				$timeout(function () {
					$state.go('home');
				});
				return $q.reject();
			}
		}
	}
})();