"use strict";

var fs = require("fs");
var path = require("path");

// Mock HTTP server
var mockServer = require("express")();
var https = require("https");
var mockServerConfig = {
	port: 8016
};
mockServer
	.get("/", function (request, response) {
		response.status(200).json({
			"result": "success"
		});
	})
	.get("/timeout", function () {
		return; // Do nothing
	})
	.get("/invalidjson", function (request, response) {
		response.status(200).end("This is invalid JSON");
	})

if (!process.env.LIVE) {
	var nock = require("./http_mocking.js");
} else {
	// Do not reject self signed certificates
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	https.createServer({
		key: fs.readFileSync(path.join(__dirname, "server.key")),
		cert: fs.readFileSync(path.join(__dirname, "server.crt"))
	}, mockServer).listen(mockServerConfig.port);	
}

module.exports = {
	nock: nock,
	mockServer: mockServer,
	mockServerConfig: mockServerConfig
};