/**
 * Created by cody on 11/16/16.
 */

(function () {
	"use strict";
	
	angular
		.module('Instafollowr')
		.factory('AuthService', AuthService);
	
	AuthService.$inject = ['$http', 'CONFIG', 'SessionService'];
	
	/* @ngInject */
	function AuthService ($http, CONFIG, SessionService) {
		var service = {
			login: login,
			register: register,
			logout: logout,
			isAuthenticated: isAuthenticated
		};
		
		return service;
		
		////////////////
		
		function login (username, password) {
			return $http.post(CONFIG.apiServiceBaseUri + 'account/login', {
				username: username,
				password: password
			}).then(function (response) {
				var token = response.data.token;
				SessionService.create(token);
				return response.data;
			}, function (response) {
				return response.error;
			});
		}

		function register (registerModel) {
			return $http.post(CONFIG.apiServiceBaseUri + 'account/register', registerModel).then(function (response) {
				return response;
			}, function (response) {
				return response.error;
			});
		}

		function logout () {
			SessionService.destroy();
			return $http.get(CONFIG.apiServiceBaseUri + 'account/logout').then(function (response) {
				return response;
			}, function (response) {
				return response.error;
			});
		}

		function isAuthenticated () {
			return SessionService.getSessionUser();
		}
	}
})();

