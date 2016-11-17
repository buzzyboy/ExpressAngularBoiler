/**
 * Created by cody on 11/16/16.
 */

(function () {
	"use strict";

	angular
		.module('Instafollowr')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['$scope', 'AuthService'];

	/* @ngInject */
	function RegisterController ($scope, AuthService) {
		/* jshint validthis: true */
		var vm = this;

		vm.activate = activate;
		vm.register = register;
		vm.registerData = {
			username: "",
			password: "",
			passwordConfirm: ""
		};
		vm.title = 'RegisterController';

		activate();

		////////////////

		function activate () { }

		function register () {
			var form = $scope.registerForm;
			AuthService.register(vm.registerData).then(function (response) {

			}, function (error) {

			});
			console.log(form);
		}
	}
})();

