"use strict";

var helper = require("./helpers/index.js");
var assert = require("chai").assert;

var Base = require("../lib/resources/index.js");

describe("Base Resource Class", function () {
	var base;
	beforeEach(function () {
		base = new Base({
			host: "127.0.0.1",
			port: 8016
		})
	});
	describe("#request", function () {
		it ("generates a http request", function (done) {
			var options = {
				path: "/",
				method: "GET"
			};

			base.request(options, function (error, response) {
				if (error) return done(error);
				assert.equal(response.result, "success");
				done();
			});
		});
		describe("Error scenarios", function () {
			it ("returns an error when connection timeout", function (done) {
				base = new Base({
					host: "127.0.0.1",
					port: 8016,
					timeout: 1
				});
				var options = {
					path: "/timeout",
					method: "GET"
				};

				base.request(options, function (error, response) {
					assert.match(error.message, /timeout/i);
					done();
				});
			});
			it ("returns an error for invalid JSON", function (done) {
				base = new Base({
					host: "127.0.0.1",
					port: 8016
				});
				var options = {
					path: "/invalidjson",
					method: "GET"
				};

				base.request(options, function (error, response) {
					assert.match(error.message, /invalid\sjson/i);
					done();
				});
			});
		});
	});
});