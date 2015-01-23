"use strict";

var chalk = require("chalk");

function Logger() {
	this._silent = false;
	this._debug = false;
}

Logger.prototype.configure = function (params) {
	if (params.silet) {
		this._silent = true;
	}

	if (params.debug) {
		this._debug = true;
	}

	return this;
}

Logger.prototype.error = function (msg) {
	if (!this._silent) {
		console.log(chalk.red(msg));
	}
};

Logger.prototype.debug = function (msg) {
	if (!this._silent && this._debug) {
		console.log(chalk.blue(msg));
	}
};

Logger.prototype.success = function (msg) {
	if (!this._silent) {
		console.log(chalk.green(msg));
	}
};

module.exports = new Logger();