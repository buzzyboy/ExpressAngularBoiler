(function () {
	'use strict';

	angular
		.module('Instafollowr')
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
				config.headers.Authorization = 'Bearer ' + SessionService.getSession().accessToken;
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
})();
