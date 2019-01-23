"use strict";

import * as _ from "lodash";
import * as pkg from "../package.json";
import * as errors from "./errors";
import Postcodes from "./resources/postcodes";
import Addresses from "./resources/addresses";
import Keys from "./resources/keys";

var resources = {
	postcodes: Postcodes,
	keys: Keys,
	addresses: Addresses,
}

class IdealPostcodes {
  public config: any;
  public postcodes: Postcodes;
  public addresses: Addresses;
  public keys: Keys;

  constructor(key, secret?) {
    var config = {
      host: "api.ideal-postcodes.co.uk",
      port: 443,
      timeout: 30000,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        'User-Agent': 'IdealPostcodes/v1 NodeBindings/' + pkg.version
      },
      version: "1",
      secret: null
    };

    if (typeof key === "string") {
      this.config = config;
      this.config.key = key;
    } else {
      this.config = _.defaults(key, config);
    }

    if (secret) {
      this.setConfig("secret", secret);
    }
    this.loadResources();
  }

  loadResources () {
    var self = this;
    var config = self.config;
    for (var resourceName in resources) {
      self[resourceName] = new resources[resourceName](config);
    }
  }

  lookupAddress (search, callback) {
    if (typeof search === 'object' && !search.query) {
      return callback(new Error("Search term required. Please provide a search query in your query"));
    }
    return this.addresses.query(search, callback);
  }

  lookupUdprn(udprn, callback) {
    this.addresses.get(udprn, function (error, response) {
      if (error) return callback(error);
      if (response.code === 2000) {
        return callback(null, response.result);
      } else if (response.code === 4044) {
        return callback(null, null);
      } else {
        return errors.generalError(response);
      }
    });
  }

  setConfig(attribute, value) {
    return this.config[attribute] = value;
  }

  keyAvailability (callback) {
    this.keys.get(this.config.key, null, function (error, response) {
      if (error) return callback(error);
      return callback(null, response.result);
    });
  }

  keyDetails(callback) {
    if (!this.config.secret) {
      return callback(new Error("No Secret Token provided. Please provide this key when initialising the client"));
    }
    this.keys.get(this.config.key, this.config.secret, function (error, response) {
      if (error) return callback(error);
      return callback(null, response.result);
    });
  }

  lookupPostcode(postcode, callback) {
    this.postcodes.get(postcode, function (error, response) {
      if (error) return callback(error);
      if (response.code === 2000) {
        return callback(null, response.result);
      } else if (response.code === 4040) {
        return callback(null, []);
      } else {
        return callback(errors.generalError(response));
      }
    });
  }

  queryLocation(location, callback) {
    this.postcodes.queryLocation(location, function (error, response) {
      if (error) return callback(error);
      return callback(null, response.result);
    });
  }
}

export default IdealPostcodes;

