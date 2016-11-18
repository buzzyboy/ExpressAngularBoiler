/**
 * Created by cody on 11/17/16.
 */

(function () {
	"use strict";
	
	angular
		.module(appName)
		.controller('RegisterController', RegisterController);
	
	RegisterController.$inject = ['$state'];
	
	/* @ngInject */
	function RegisterController ($state) {
		/* jshint validthis: true */
		var vm = this;

		vm.onRegisterSuccess = onRegisterSuccess;

		function onRegisterSuccess () {
			$state.go('login');
		}
	}
})();

