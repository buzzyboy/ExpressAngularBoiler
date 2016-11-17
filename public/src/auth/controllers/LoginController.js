/**
 * Created by cody on 11/16/16.
 */

(function () {
	"use strict";

	angular
		.module('Instafollowr')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['AuthService'];

	/* @ngInject */
	function LoginController (AuthService) {
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
			console.log("Login Data", vm.loginData);
			AuthService.login(vm.loginData.username, vm.loginData.password).then(function (response) {}, function (error) {

			});
		}
	}
})();

