"use strict";

var nock = require("nock");

if (process.env.LIVE) {
	require("./mock_server.js");
} else {
	require("./http_mocking.js");
}

if (process.env.RECORD) {
	nock.recorder.rec();
}

module.exports = {
	nock: nock
};