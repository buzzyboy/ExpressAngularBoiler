/**
 * Created by cody on 11/16/16.
 */

(function () {
	"use strict";

	angular
		.module('Instafollowr')
		.controller('ApplicationController', ApplicationController);

	ApplicationController.$inject = ['$rootScope', 'SessionService'];

	/* @ngInject */
	function ApplicationController ($rootScope, SessionService) {
		/* jshint validthis: true */
		var app = this;

		app.activate = activate;
		app.title = 'ApplicationController';

		activate();

		////////////////

		function activate () { }
	}
})();

