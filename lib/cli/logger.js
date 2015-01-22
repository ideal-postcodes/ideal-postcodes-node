"use strict";

var chalk = require("chalk");

function Logger() {
	this.silent = false;
	this.debug = false;
}

Logger.prototype.configure = function (params) {
	if (params.silet) {
		this.silent = true;
	}

	if (params.debug) {
		this.debug = true;
	}

	return this;
}

Logger.prototype.error = function (msg) {
	if (!this.silent) {
		console.log(chalk.red(msg));
	}
};

Logger.prototype.debug = function (msg) {
	if (!this.silent && this.debug) {
		console.log(chalk.blue(msg));
	}
};

Logger.prototype.success = function (msg) {
	if (!this.silent) {
		console.log(chalk.green(msg));
	}
};

module.exports = new Logger();