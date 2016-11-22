/**
 * Created by cody on 11/16/16.
 */

(function () {
	"use strict";

	angular
		.module(appName)
		.controller('dRegisterController', RegisterController);

	RegisterController.$inject = ['$scope', 'AuthService'];

	/* @ngInject */
	function RegisterController ($scope, AuthService) {
		/* jshint validthis: true */
		var vm = this;

		vm.register = register;
		vm.registerData = {
			username: "",
			password: "",
			passwordConfirm: ""
		};
		vm.formError = null;
		vm.title = 'RegisterController';

		function register () {
			var form = $scope.registerForm;
			vm.formError = null;
			AuthService.register(vm.registerData).then(function (response) {
				$scope.onRegister();
			}, function (errorMessage) {
				vm.formError = errorMessage;
				$scope.onError();
			});
		}
	}
})();

