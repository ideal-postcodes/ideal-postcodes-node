"use strict";

var fs = require("fs");
var path = require("path");
var https = require("https");
var mockServerConfig = {
	port: 8016
};
var mockServer = require("express")()
	.get("/", function (request, response) {
		response.status(200).json({
			"result": "success",
			"code": 2000
		});
	})
	.get("/timeout", function () {
		return; // Do nothing
	})
	.get("/invalidjson", function (request, response) {
		response.status(200).end("This is invalid JSON");
	})
	.get("/invalid_syntax", function (request, response) {
		response.status(400).json({
			"code": 4000
		})
	})
	.get("/invalid_key", function (request, response) {
		response.status(401).json({
			"code": 4010
		})
	})
	.get("/balance_depleted", function (request, response) {
		response.status(402).json({
			"code": 4020
		})
	})
	.get("/limit_reached", function (request, response) {
		response.status(402).json({
			"code": 4021
		})
	});

// Do not reject self signed certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

module.exports = https.createServer({
	key: fs.readFileSync(path.join(__dirname, "server.key")),
	cert: fs.readFileSync(path.join(__dirname, "server.crt"))
}, mockServer).listen(mockServerConfig.port);	