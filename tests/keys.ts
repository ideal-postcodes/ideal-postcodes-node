"use strict";

var key;
import IdealPostcodes from '../lib/index';
import { assert } from "chai";
import * as helper from "./helpers/index";
var httpMock = helper.httpMock;
var testConfig = {
	key: "gandhi",
	host: "localhost",
	port: 1337
};
var idealPostcodes;

describe ("Key information convenience methods", function () {
	var scope;

	beforeEach(function () {
		idealPostcodes = new IdealPostcodes(testConfig);
	});

	afterEach(function () {
		if (scope) {
			assert.isTrue(scope.isDone());
			scope = undefined;
		}
	});

	describe("#keyAvailability", function () {
		it ("returns true if key available", function (done) {
			idealPostcodes.setConfig("key", helper.availableTestKey);
			scope = httpMock.keys.available();
			idealPostcodes.keyAvailability(function (error, info) {
				if (error) return done(error);
				assert.isTrue(info.available);
				done();
			});
		});
		it ("returns false if key available", function (done) {
			idealPostcodes.setConfig("key", helper.notAvailableTestKey);
			scope = httpMock.keys.notAvailable();
			idealPostcodes.keyAvailability(function (error, info) {
				if (error) return done(error);
				assert.isFalse(info.available);
				done();
			});
		});
	});

	describe("#keyDetails", function () {
		it ("returns key details", function (done) {
			idealPostcodes.setConfig("key", helper.testKey);
			idealPostcodes.setConfig("secret", helper.testSecret);
			scope = httpMock.keys.secretSuccess();
			idealPostcodes.keyDetails(function (error, info) {
				if (error) return done(error);
				assert.property(info, "lookups_remaining");
				assert.property(info, "daily_limit");
				assert.property(info, "individual_limit");
				assert.property(info, "allowed_urls");
				assert.property(info, "notifications");
				done();
			});			
		});
		it ("returns an error if secret not assigned", function (done) {
			idealPostcodes.setConfig("key", helper.testKey);
			idealPostcodes.setConfig("secret", null);
			idealPostcodes.keyDetails(function (error, info) {
				assert.match(error.message, /no\ssecret\stoken\sprovided/i);
				done();
			});			
		});
	});
});
