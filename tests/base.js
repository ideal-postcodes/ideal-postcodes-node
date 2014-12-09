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
			beforeEach(function () {
				base = new Base({
					host: "127.0.0.1",
					port: 8016
				});
			});
			if (process.env.LIVE) {
				// Need to get nock to timeout
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
			}
			it ("returns an error if invalid syntax submitted to API", function (done) {
				base.request({
					path: "/invalid_syntax",
					method: "GET"
				}, function (error, response) {
					assert.isNotNull(error);
					assert.match(error.message, /invalid\ssyntax\ssubmitted/i);
					done();
				});
			});
			it ("returns an error if invalid key", function (done) {
				base.request({
					path: "/invalid_key",
					method: "GET"
				}, function (error, response) {
					assert.isNotNull(error);
					assert.match(error.message, /invalid\skey/i);
					done();
				});
			});
			it ("returns an error if key balance depleted", function (done) {
				base.request({
					path: "/balance_depleted",
					method: "GET"
				}, function (error, response) {
					assert.isNotNull(error);
					assert.match(error.message, /key\sbalance\sdepleted/i);
					done();
				});
			});
			it ("returns an error if limit reached", function (done) {
				base.request({
					path: "/limit_reached",
					method: "GET"
				}, function (error, response) {
					assert.isNotNull(error);
					assert.match(error.message, /limit\sreached/i);
					done();
				});
			});
			it ("returns an error for invalid JSON response from API", function (done) {
				base.request({
					path: "/invalidjson",
					method: "GET"
				}, function (error, response) {
					assert.match(error.message, /invalid\sjson/i);
					done();
				});
			});
		});
	});
});