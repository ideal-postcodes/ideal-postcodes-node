"use strict";

var helper = require("./helpers/index.js");
var assert = require("chai").assert;
var errors = require("../lib/errors");

describe("Errors module", function () {

	describe("invalidResponseError", function () {
		it ("returns an invalid response error", function () {
			var error = errors.invalidResponseError();
			assert.match(error.message, /invalid json/i);
		});
	});

	describe("timeoutError", function () {
		it ("returns a timeout error", function () {
			var error = errors.timeoutError(1000);
			assert.match(error.message, /timeout error/i);
			assert.match(error.message, /1s/i);
		});
	});

	describe("connectionError", function () {
		it ("returns a bad connection error", function () {
			var error = errors.connectionError("foo");
			assert.match(error.message, /error\s\occurred\sconnecting/i);
			assert.match(error.message, /foo/i);
		});
	});

	describe("detect", function () {
		it ("detects invalid syntax", function () {
			var error = errors.detect({
				"code": 4000
			});
			assert.isNotNull(error);
			assert.match(error.message, /invalid\ssyntax\ssubmitted/i);
		});

		it ("detects invalid keys", function () {
			var error = errors.detect({
				"code": 4010
			});
			assert.isNotNull(error);
			helper.isInvalidKeyError(error);
		});

		it ("detects insufficient balance", function () {
			var error = errors.detect({
				"code": 4020
			});
			assert.isNotNull(error);
			helper.isBalanceDepletedError(error);
		});

		it ("detects limit breach", function () {
			var error = errors.detect({
				"code": 4021
			});
			assert.isNotNull(error);
			helper.isLimitReachedError(error);
		});

		it ("returns an error if invalid no code response from API", function () {
			var error = errors.detect({});
			assert.isNotNull(error);
			assert.match(error.message, /invalid\sjson/i);
		});

		it ("returns an error if code is not a valid number", function () {
			var error = errors.detect({
				"code": "foo"
			});
			assert.isNotNull(error);
			assert.match(error.message, /invalid\sjson/i);
		});

		it ("returns null if no error detected", function () {
			var error = errors.detect({
				"code": 2000
			});
			assert.isNull(error);
		});
	});
});