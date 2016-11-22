/**
 * Created by cody on 11/16/16.
 */

(function () {
	"use strict";
	
	angular
		.module(appName)
		.factory('AuthService', AuthService);
	
	AuthService.$inject = ['$http', '$q', 'CONFIG', 'SessionService'];
	
	/* @ngInject */
	function AuthService ($http, $q, CONFIG, SessionService) {
		var service = {
			login: login,
			register: register,
			logout: logout,
			isAuthenticated: isAuthenticated,
			getMe: getMe
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
				getMe();
				return response.data;
			}, onHTTPPromiseFail);
		}

		function register (registerModel) {
			return $http.post(CONFIG.apiServiceBaseUri + 'account/register', registerModel).then(function (response) {
				return response.data;
			}, onHTTPPromiseFail);
		}

		function logout () {
			SessionService.destroy();
			return $http.get(CONFIG.apiServiceBaseUri + 'account/logout').then(function (response) {
				return response;
			}, onHTTPPromiseFail);
		}

		function isAuthenticated () {
			return SessionService.getSessionUser();
		}

		function getMe () {
			return $http.get(CONFIG.apiServiceBaseUri + 'account/me').then(function (response) {
				if (response.data.success)
				{
					var user = response.data.user;
					SessionService.updateSessionUser(user);
				}
			}, onHTTPPromiseFail);
		}

		function onHTTPPromiseFail (response) {
			if (response.data && response.data.message)
			{
				return $q.reject(response.data.message);
			}
			else
			{
				return $q.reject("Bad Request");
			}
		}
	}
})();

