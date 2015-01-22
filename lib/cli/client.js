"use strict";

var client = module.exports = {};
var Client = require("socket.io-client");
var chalk = require("chalk");
var endpoints = {
	development: "ws://localhost:9090/logstream",
	test: "ws://localhost:9090/logstream",
	live: "wss://feed.ideal-postcodes.co.uk/logstream"
};
var connectionString = endpoints[process.env.NODE_ENV] || endpoints["live"];
var DEFAULT_KEY = process.env.IDEALPOSTCODES_KEY;
var DEFAULT_SECRET = process.env.IDEALPOSTCODES_SECRET;

// Create a new socket.io client
client.create = function (params) {
	var key = params.key || DEFAULT_KEY;
	var secret = params.secret || DEFAULT_SECRET;

	return Client(connectionString, {
		query: {
			key: key,
			secret: secret
		}
	});
};