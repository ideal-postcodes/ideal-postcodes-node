"use strict";

import * as helper from "./helpers/index";
import { assert } from "chai";
var httpMock = helper.httpMock;

import Keys from "../lib/resources/keys";
var keys;

var testKey = helper.testKey;
var testSecret = helper.testSecret;

describe ("Keys Resource", function () {
	var scope;

	afterEach(function () {
		if (scope) {
			assert.isTrue(scope.isDone());
			scope = undefined;
		}
	});

	describe ("get", function () {
		beforeEach(function () {
			keys = new Keys({
				host: "localhost",
				port: 1337,
				key: "gandhi"
			});
		});
		it ("returns true if key available", function (done) {
			scope = httpMock.keys.available();
			keys.get(helper.availableTestKey, null, function (error, response) {
				if (error) return done(error);
				assert.equal(response.code, 2000);
				assert.isTrue(response.result.available);
				done();
			});
		});
		it ("returns false if key not available", function (done) {
			scope = httpMock.keys.notAvailable();
			keys.get(helper.notAvailableTestKey, null, function (error, response) {
				if (error) return done(error);
				assert.equal(response.code, 2000);
				assert.isFalse(response.result.available);
				done();
			});
		});
		it ("returns 404 if key does not exist", function (done) {
			scope = httpMock.keys.notFound();
			keys.get("foo", null, function (error, response) {
				helper.isInvalidKeyError(error);
				done();
			});
		});
	});
	describe("get with secret key", function () {
		it ("returns key information", function (done) {
			scope = httpMock.keys.secretSuccess();
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
			scope = httpMock.keys.secretInvalid();
			keys.get("foo", testSecret, function (error, response) {
				helper.isInvalidKeyError(error);
				done();
			});
		});
		it ("returns an error if invalid secret", function (done) {
			scope = httpMock.keys.secretInvalidUserToken();
			keys.get(testKey, "foo", function (error, response) {
				assert.match(error.message, /4012/);
				done();
			});
		});
	});
});
