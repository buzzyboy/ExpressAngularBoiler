/**
 * Created by cody on 11/16/16.
 */

// If you change this, be sure to change it in the index.ejs in the ng-app directive
var appName = 'MyApplication';

(function () {
	"use strict";
	
	angular.module(appName, [
		'ui.router',
		'ngStorage'
	]);
})();
