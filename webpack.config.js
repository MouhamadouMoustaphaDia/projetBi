const path = require("path");
console.log('custom webpack config');
module.exports = {
	resolve: {
		fallback: {
			"path": require.resolve("path-browserify")
		}
	}
};
