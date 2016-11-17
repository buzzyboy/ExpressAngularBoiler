/**
 * Created by cody on 11/16/16.
 */

(function () {
	"use strict";
	
	angular
		.module('Instafollowr')
		.factory('AuthService', AuthService);
	
	AuthService.$inject = ['$http', 'CONFIG'];
	
	/* @ngInject */
	function AuthService ($http, CONFIG) {
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
				debugger;
				return response;
			}, function (error) {
				debugger;
			});
		}

		function register (registerModel) {
			$http.post(CONFIG.apiServiceBaseUri + 'account/register', registerModel).then(function (response) {
				debugger;
				return response;
			}, function (error) {
				debugger;
			});
		}
	}
})();

