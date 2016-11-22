
module.exports = function(grunt) {

	grunt.initConfig({
		exec: {
			site: {
				cmd: "npm install",
				options: {
					cwd: "./public"
				}
			}
		}
	});

	grunt.registerTask('default', ['exec']);
	grunt.loadNpmTasks('grunt-exec');
};