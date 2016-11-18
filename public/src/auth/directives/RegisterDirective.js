/**
 * Created by cody on 11/16/16.
 */

(function () {
	"use strict";

	angular
		.module(appName)
		.directive("registerPartial", loginPartial);

	loginPartial.$inject = [];
	function loginPartial () {
		return {
			restrict: "AE",
			templateUrl: "/src/auth/views/_register.html",
			scope: {
				onRegister: "&",
				onError: "&"
			}
		};
	}
})();