/**
 * Created by cody on 11/16/16.
 */

(function () {
	"use strict";

	angular
		.module(appName)
		.controller('ApplicationController', ApplicationController);

	ApplicationController.$inject = ['$rootScope', '$state', 'AuthService'];

	/* @ngInject */
	function ApplicationController ($rootScope, $state, AuthService) {
		/* jshint validthis: true */
		var app = this;

		app.activate = activate;
		app.signOut = signOut;
		app.title = 'ApplicationController';

		activate();

		////////////////

		function activate () {
			if (AuthService.isAuthenticated())
			{
				AuthService.getMe();
			}
		}

		function signOut () {
			AuthService.logout();
			$state.go('login');
		}
	}
})();

