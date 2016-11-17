/**
 * Created by cody on 11/16/16.
 */

(function () {
	"use strict";

	angular
		.module('Instafollowr')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['AuthService'];

	/* @ngInject */
	function RegisterController (AuthService) {
		/* jshint validthis: true */
		var vm = this;

		vm.activate = activate;
		vm.title = 'RegisterController';

		activate();

		////////////////

		function activate () { }
	}
})();

