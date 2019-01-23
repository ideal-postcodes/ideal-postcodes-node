import Base from "./index";
import * as q from "querystring";
import * as errors from "../errors";

class Keys extends Base {
  constructor(config: any) {
    super(config);
  }

  get(key, user_token, callback) {
    var self = this;
    var path = "/v1/keys/" + q.escape(key);

    if (user_token) path += `?${ q.stringify({ user_token }) }`;

    self.request({
      path: path,
      method: "GET"
    }, function (error, response) {
      if (error) return callback(error);
      if (response.code === 2000) {
        return callback(null, response);
      } else {
        return callback(errors.generalError(response));
      }
    });
  }
}
	
export default Keys;

