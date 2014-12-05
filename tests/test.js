// Set API Key, currently set to service test user

var api_key = "ak_hkflvrgzDirR9aJW2qJuZKXi1UumW";

var client = require('../lib/index.js')(api_key);
require('./errors.js')(client);
require('./postcode.js')(client);