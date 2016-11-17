/**
 * Created by cody on 11/16/16.
 */

(function () {
	"use strict";

	angular
		.module('Instafollowr')
		.controller('ApplicationController', ApplicationController);

	ApplicationController.$inject = ['$rootScope', '$state', 'SessionService'];

	/* @ngInject */
	function ApplicationController ($rootScope, $state, SessionService) {
		/* jshint validthis: true */
		var app = this;

		app.activate = activate;
		app.signOut = signOut;
		app.title = 'ApplicationController';

		activate();

		////////////////

		function activate () { }

		function signOut () {
			SessionService.destroy();
			$state.go('login');
		}
	}
})();

