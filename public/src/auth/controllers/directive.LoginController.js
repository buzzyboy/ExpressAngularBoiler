/**
 * Created by cody on 11/16/16.
 */

(function () {
	"use strict";

	angular
		.module('Instafollowr')
		.controller('dLoginController', LoginController);

	LoginController.$inject = ['$scope', 'AuthService'];

	/* @ngInject */
	function LoginController ($scope, AuthService) {
		/* jshint validthis: true */
		var vm = this;

		vm.activate = activate;
		vm.loginData = {
			username: "",
			password: ""
		};
		vm.login = login;
		vm.title = 'LoginController';

		activate();

		////////////////w

		function activate () { }

		function login () {
			AuthService.login(vm.loginData.username, vm.loginData.password).then(function (response) {
				$scope.onLogin();
			}, function (error) {
				$scope.onError(error);
			});
		}
	}
})();

