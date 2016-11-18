/**
 * Created by cody on 11/16/16.
 */

(function () {
	"use strict";

	angular
		.module(appName)
		.constant("CONFIG", {
			apiServiceBaseUri: "http://localhost:3000/api/"
		});
})();