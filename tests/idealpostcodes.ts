"use strict";

var key, secret;

import IdealPostcodes from '../lib/index';
import { assert } from "chai";
import * as helper from "./helpers/index";

var testConfig = {
	key: "gandhi",
	host: "localhost",
	port: 1337
};
var idealPostcodes: IdealPostcodes;

describe ("IdealPostcodes", function () {
	describe("Initialisation", function () {
		it ("initialises with defaults and key if passed string", function () {
			key = "foo";
			idealPostcodes = new IdealPostcodes(key);
			assert.equal(idealPostcodes.config.key, key);
			assert.equal(idealPostcodes.config.host, "api.ideal-postcodes.co.uk");
			assert.equal(idealPostcodes.config.port, 443);
			assert.equal(idealPostcodes.config.timeout, 30000);
		});
		it ("initialises with new config if passed object", function () {
			var newConfig = {
				key: "foob",
				host: "bar",
				port: "baz",
				timeout: "quux"
			};
			idealPostcodes = new IdealPostcodes(newConfig);
			for (var setting in newConfig) {
				assert.equal(idealPostcodes.config[setting], newConfig[setting]);
			}
		});
		it ("initialises with secret if passed second argument", function () {
			key = "foo";
			secret = "bar";
			idealPostcodes = new IdealPostcodes(key, secret);
			assert.equal(idealPostcodes.config.secret, secret);
		});
	});
	
	describe("setConfig", function () {
		it ("assigns config attributes", function () {
			var secret = "foo";
			idealPostcodes.setConfig("secret", secret);
			assert.equal(idealPostcodes.config.secret, secret);
		});
	});
});

