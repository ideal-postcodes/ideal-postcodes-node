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

// Create a new socket.io client
client.create = function (params) {
	return Client(connectionString, {
		query: {
			key: params.key,
			secret: params.secret
		}
	});
};