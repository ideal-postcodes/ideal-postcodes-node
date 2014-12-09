"use strict";

if (process.env.LIVE) {
	var server = require("./mock_server.js");
} else {
	var nock = require("./http_mocking.js");
}

if (process.env.RECORD) {
	nock.recorder.rec();
}

module.exports = {
	nock: nock
};