"use strict";

var nock = require("nock");
var assert = require("chai").assert;

if (process.env.LIVE) {
	require("./mock_server.js");
} else {
	require("./http_mocking.js");
}

if (process.env.RECORD) {
	nock.recorder.rec();
}

var testPostcode = "ID1 1QD";
var invalidPostcode = "ID1 KFA";
var limitReachedPostcode = "ID1 CHOP";
var balanceDepletedPostcode = "ID1 CLIP";

var availableTestKey = "iddqd";
var notAvailableTestKey = "idkfa";

var testKey = "gandhi";
var testSecret = "uk_hxp6ouk0rmyXoobVJnehrsQcdvTfb";

var testUdprn = "0";
var invalidUdprn = "-1";
var balanceDepletedUdprn = "-2";
var limitReachedUdprn = "-3";

var isTestPostcodeResult = function (result) {
	assert.isArray(result);
	result.forEach(function (address) {
		assert.equal(address.postcode, testPostcode);
		isAddressObject(address);
	});
};

var isInvalidKeyError = function (error) {
	assert.match(error.message, /invalid\skey/i);
};

var isLimitReachedError = function (error) {
	assert.match(error.message, /limit\sreached/i);
};

var isBalanceDepletedError = function (error) {
	assert.match(error.message, /key\sbalance\sdepleted/i);
};

var isPostcodeLocationObject = function (o) {
	assert.property(o, "longitude");
	assert.property(o, "latitude");
	assert.property(o, "postcode");
	assert.property(o, "northings");
	assert.property(o, "eastings");
};

var isAddressObject = function (o) {
	assert.property(o, "postcode");
	assert.property(o, "line_1");
	assert.property(o, "line_2");
	assert.property(o, "line_3");
	assert.property(o, "post_town");
	assert.property(o, "premise");
	assert.property(o, "ward");
	assert.property(o, "district");
	assert.property(o, "thoroughfare");
};

module.exports = {
	nock: nock,
	testPostcode: testPostcode,
	isTestPostcodeResult: isTestPostcodeResult,
	invalidPostcode: invalidPostcode,
	isInvalidKeyError: isInvalidKeyError,
	limitReachedPostcode: limitReachedPostcode,
	isLimitReachedError: isLimitReachedError,
	balanceDepletedPostcode: balanceDepletedPostcode,
	isBalanceDepletedError: isBalanceDepletedError,
	isPostcodeLocationObject: isPostcodeLocationObject,
	isAddressObject: isAddressObject,
	availableTestKey: availableTestKey,
	notAvailableTestKey: notAvailableTestKey,
	testKey: testKey,
	testSecret: testSecret,
	testUdprn: testUdprn,
	invalidUdprn: invalidUdprn,
	balanceDepletedUdprn: balanceDepletedUdprn,
	limitReachedUdprn: limitReachedUdprn
};