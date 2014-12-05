"use strict";

if (!process.env.LIVE) {
	var nock = require("./http_mocking.js");
}