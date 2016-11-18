(function () {
	'use strict';

	angular
		.module(appName)
		.factory('SessionService', sessionService);

	sessionService.$inject = ['$localStorage', '$rootScope'];

	function sessionService ($localStorage, $rootScope) {
		var self = this;

		var service = {
			create: create,
			destroy: destroy,
			exists: exists,
			getSession: getSession,
			getSessionUser: getSessionUser,
			getParameterByName: getParameterByName
		};
		return service;

		function getSessionUser () {
			var session = getSession();
			if (session !== undefined && session.hasOwnProperty('user'))
				return session.user;
			return null;
		}

		// implementation
		/**
		 * @param accessToken
		 * @returns {{user: AppUser, accessToken: *}|*|null}
		 */
		function create (accessToken) {
			self.session = {
				user: {
					id: '',
					userName: '',
					email: '',
					firstName: '',
					lastName: ''
				},
				accessToken: accessToken
			};
			$rootScope.isAuthenticated = true;
			$rootScope.user = self.session.user;

			$localStorage.session = self.session;
			return self.session;
		}

		function destroy () {
			self.session = null;

			var subdomain = $localStorage.subdomain;
			$rootScope.isAuthenticated = false;

			$localStorage.$reset();

			if (subdomain)
			{
				$localStorage.subdomain = subdomain;
			}
		}

		function exists () {
			var exists = typeof $localStorage.session !== 'undefined' && $localStorage.session !== null;
			if (exists)
			{
				$rootScope.isAuthenticated = true;
			}
			return exists;
		}

		function getSession () {
			return $localStorage.session;
		}

		function getParameterByName (name) {
			name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
				results = regex.exec(location.href);
			return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		}
	}
})();
