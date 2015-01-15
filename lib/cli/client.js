"use strict";

var client = module.exports = {};
var Client = require("socket.io-client");
var chalk = require("chalk");
var endpoints = {
	development: "ws://localhost:9090/logstream",
	test: "ws://localhost:9090/logstream",
	live: "ws://feed.ideal-postcodes.co.uk/logstream"
};
var connectionString = endpoints[process.env.NODE_ENV] || endpoints["live"];
var DEFAULT_KEY = process.env.IDEALPOSTCODES_KEY;
var DEFAULT_SECRET = process.env.IDEALPOSTCODES_SECRET;

// Create a new socket.io client
client.create = function (params) {
	var key = params.key || DEFAULT_KEY;
	var secret = params.secret || DEFAULT_SECRET;

	if (typeof key === "undefined") {
		console.log(chalk.red("Log streaming requires an API Key which you want to track."));
		console.log("Set your API Key with a flag or environment variable. E.g.")
		console.log("");
		console.log("$ idealpostcodes logs -k <your_key>");
		console.log("\nalternatively,\n");
		console.log("$ IDEALPOSTCODES_KEY=<key> idealpostcodes logs");
		console.log("");
		process.exit(1);
	}

	if (typeof secret === "undefined") {
		console.log(chalk.red("Log streaming requires an secret key to identify your account."));
		console.log("Set your account secret with a flag or environment variable. E.g.")
		console.log("");
		console.log("$ idealpostcodes logs -s <your_key>");
		console.log("\nalternatively,\n");
		console.log("$ IDEALPOSTCODES_SECRET=<key> idealpostcodes logs");
		console.log("");
		process.exit(1);
	}
	
	return Client(connectionString, {
		query: {
			key: key,
			secret: secret
		}
	});
};