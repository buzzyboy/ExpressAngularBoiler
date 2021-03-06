﻿(function () {
	'use strict';

	angular
		.module(appName)
		.factory('AuthInterceptorService', AuthInterceptorService);

	AuthInterceptorService.$inject = ['$rootScope', '$location', '$q', 'SessionService'];

	function AuthInterceptorService ($rootScope, $location, $q, SessionService) {
		var service = {
			request: request,
			responseError: responseError
		};

		return service;

		// implementation
		function request (config) {
			config.headers = config.headers || {};
			if (SessionService.exists())
			{
				config.headers.Authorization = SessionService.getSession().accessToken;
			}

			return config;
		}

		function responseError (rejection) {
			if (rejection.status === 401)
			{
				$rootScope.isAuthenticated = false;
				SessionService.destroy();
				$location.path('/login');
			}
			return $q.reject(rejection);
		}
	}

	addInterceptors.$inject = ['$httpProvider'];

	function addInterceptors($httpProvider) {
		$httpProvider.interceptors.push('AuthInterceptorService');
	}

	angular
		.module(appName)
		.config(addInterceptors);
})();
