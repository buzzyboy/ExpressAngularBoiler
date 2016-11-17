/**
 * Created by cody on 11/16/16.
 */

(function () {
	"use strict";
	
	angular
		.module('Instafollowr')
		.factory('AuthService', AuthService);
	
	AuthService.$inject = ['$http', '$q', 'CONFIG'];
	
	/* @ngInject */
	function AuthService ($http, $q, CONFIG) {
		var service = {
			login: login,
			register: register
		};
		
		return service;
		
		////////////////
		
		function login (username, password) {
			$http.post(CONFIG.apiServiceBaseUri + 'account/login', {
				username: username,
				password: password
			}).then(function (response) {
				if (response.data.error)
				{
					return $q.reject(response.error);
				}
				return response;
			}, function (response) {
				return response.error;
			});
		}

		function register (registerModel) {
			$http.post(CONFIG.apiServiceBaseUri + 'account/register', registerModel).then(function (response) {
				return response;
			}, function (response) {
				return response.error;
			});
		}
	}
})();

