/**
 * Created by cody on 11/17/16.
 */

(function () {
	"use strict";

	angular
		.module(appName)
		.config(initRoutes);

	initRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];
	function initRoutes ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/login');
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
		$stateProvider.state({
			name: 'register',
			url: '/register',
			views: {
				'main@': {
					templateUrl: 'src/states/register/views/register.html'
				}
			},
			resolve: {
				unauthenticated: unauthenticated
			}
		});

		authenticated.$inject = ['$q', '$state', 'AuthService'];
		function authenticated ($q, $state, AuthService) {
			if (AuthService.isAuthenticated())
			{
				return $q.when();
			}
			else
			{
				$state.go('login');
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