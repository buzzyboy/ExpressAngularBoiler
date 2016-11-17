/**
 * Created by cody on 11/16/16.
 */

(function () {
	"use strict";

	angular
		.module('Instafollowr')
		.directive("loginPartial", loginPartial);

	loginPartial.$inject = [];
	function loginPartial () {
		return {
			restrict: "AE",
			templateUrl: "/src/auth/views/_login.html"
		};
	}
})();