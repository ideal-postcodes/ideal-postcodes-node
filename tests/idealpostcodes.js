"use strict";

var key;
var IdealPostcodes = require('../lib/index.js');
var assert = require('chai').assert;
var helper = require("./helpers/");
var testConfig = {
	key: "gandhi",
	host: "localhost",
	port: 1337
};
var idealPostcodes;

describe ("IdealPostcodes", function () {
	describe("Initialisation", function () {
		it ("initialises with defaults and key if passed string", function () {
			key = "foo";
			idealPostcodes = IdealPostcodes(key);
			assert.equal(idealPostcodes.config.key, key);
			assert.equal(idealPostcodes.config.host, "api.ideal-postcodes.co.uk");
			assert.equal(idealPostcodes.config.port, 443);
			assert.equal(idealPostcodes.config.timeout, 30000);
		});
		it ("initialises with new config if passed object", function () {
			var newConfig = {
				key: "foo",
				host: "bar",
				port: "baz",
				timeout: "quux"
			};
			idealPostcodes = IdealPostcodes(newConfig);
			for (var setting in newConfig) {
				assert.equal(idealPostcodes.config[setting], newConfig[setting]);
			}
		})
	});
});

require("./convenience_methods");