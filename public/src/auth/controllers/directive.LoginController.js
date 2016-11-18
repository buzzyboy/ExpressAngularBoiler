/**
 * Created by cody on 11/16/16.
 */

(function () {
	"use strict";

	angular
		.module(appName)
		.controller('dLoginController', LoginController);

	LoginController.$inject = ['$scope', 'AuthService'];

	/* @ngInject */
	function LoginController ($scope, AuthService) {
		/* jshint validthis: true */
		var vm = this;

		vm.errorMessage = null;
		vm.loginData = {
			username: "",
			password: ""
		};
		vm.login = login;

		function login () {
			vm.errorMessage = "";
			AuthService.login(vm.loginData.username, vm.loginData.password).then(function (response) {
				$scope.onLogin();
			}, function (error) {
				vm.errorMessage = error;
				$scope.onError();
			});
		}
	}
})();

