import Base from "./index";
import * as q from "querystring";

class Postcodes extends Base {
  constructor(config: any) {
    super(config)
  }

  get(postcode, callback) {
    var self = this;
    var query: any = {
      api_key: self.config.key
    };
    var path = "/v1/postcodes/" + q.escape(postcode) + "?" + q.stringify(query);
    self.request({
      path: path,
      method: "GET"
    }, callback);
  }

  queryLocation(geolocation, callback) {
    var self = this;
    var query: any = {
      api_key: self.config.key,
      lonlat: [geolocation.longitude, geolocation.latitude].join(",")
    };

    if (geolocation.radius) {
      query.radius = geolocation.radius;
    }

    if (geolocation.limit) {
      query.limit = geolocation.limit;
    }

    var path = "/v1/postcodes" + "?" + q.stringify(query);
    self.request({
      path: path,
      method: "GET"
    }, callback);
  }
}

export default Postcodes;

