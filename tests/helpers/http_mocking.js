"use strict";

var nock = require("nock");

// No real web requests should be made unless process.env.LIVE=true
nock.disableNetConnect();

// nock.recorder.rec();

// Load mocked requests
require("./mocked_requests.js")(nock);

module.exports = nock;