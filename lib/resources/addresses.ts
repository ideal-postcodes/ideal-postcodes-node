import Base from "./index";
import * as q from "querystring";
import * as _ from "lodash";
import * as errors from "../errors";

class Addresses extends Base {
  constructor(config) {
    super(config);
  }

  get(udprn, callback) {
    var self = this;
    var query = {
      api_key: self.config.key
    };
    var path = "/v1/addresses/" + q.escape(udprn) + "?" + q.stringify(query);
    self.request({
      path: path,
      method: "GET"
    }, callback);
  }

  query(searchTerm, callback) {
    var self = this;
    var query: any = {
      api_key: self.config.key
    };
    if (typeof searchTerm === 'string') {
      query.q = searchTerm;
    } else {
      query = _.defaults(searchTerm, query);
    }
    var path = "/v1/addresses?" + q.stringify(query);
    self.request({
      path: path,
      method: "GET"
    }, callback);
  }
}

export default Addresses;

