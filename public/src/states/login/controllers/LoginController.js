/**
 * Created by cody on 11/17/16.
 */

(function () {
	"use strict";
	
	angular
		.module('Instafollowr')
		.controller('LoginController', LoginController);
	
	LoginController.$inject = ['$state'];
	
	/* @ngInject */
	function LoginController ($state) {
		/* jshint validthis: true */
		var vm = this;
		
		vm.activate = activate;
		vm.onLoginSuccess = onLoginSuccess;
		vm.onLoginError = onLoginError;
		vm.title = 'LoginController';
		
		activate();
		
		////////////////
		
		function activate () { }

		function onLoginSuccess () {
			$state.go('home');
		}

		function onLoginError () {
		}
	}
})();

