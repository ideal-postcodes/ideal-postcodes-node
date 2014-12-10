"use strict";

var helper = require("./helpers/index.js");
var assert = require("chai").assert;

var Keys = require("../lib/resources/keys.js");
var keys;

var testKey = helper.testKey;
var testSecret = helper.testSecret;

describe ("Keys Resource", function () {
	describe ("get", function () {
		beforeEach(function () {
			keys = new Keys({
				host: "localhost",
				port: 1337,
				key: "gandhi"
			});
		});
		it ("returns true if key available", function (done) {
			keys.get(helper.availableTestKey, function (error, response) {
				if (error) return done(error);
				assert.equal(response.code, 2000);
				assert.isTrue(response.result.available);
				done();
			});
		});
		it ("returns false if key not available", function (done) {
			keys.get(helper.notAvailableTestKey, function (error, response) {
				if (error) return done(error);
				assert.equal(response.code, 2000);
				assert.isFalse(response.result.available);
				done();
			});
		});
		it ("returns 404 if key does not exist", function (done) {
			keys.get("foo", function (error, response) {
				helper.isInvalidKeyError(error);
				done();
			});
		});
	});
	describe("get with secret key", function () {
		it ("returns key information", function (done) {
			keys.get(testKey, testSecret, function (error, response) {
				if (error) return done(error);
				assert.property(response.result, "lookups_remaining");
				assert.property(response.result, "daily_limit");
				assert.property(response.result, "individual_limit");
				assert.property(response.result, "allowed_urls");
				assert.property(response.result, "notifications");
				done();
			});
		});
		it ("returns error if invalid key", function (done) {
			keys.get("foo", testSecret, function (error, response) {
				helper.isInvalidKeyError(error);
				done();
			});
		});
		it ("returns an error if invalid secret", function (done) {
			keys.get(testKey, "foo", function (error, response) {
				assert.match(error.message, /4012/);
				done();
			});
		});
	});
});