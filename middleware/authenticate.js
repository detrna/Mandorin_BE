import { jwtHelper } from "../utility/jwtHelper";
import response from "../utility/response";

export default function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return response(res, 401, {}, "Access token is missing");

  const accessToken = authHeader.split(" ")[1];

  try {
    const decoded = jwtHelper.verifyAccess(accessToken);
    req.user = decoded;
    next();
  } catch (err) {
    return response(res, 403, {}, "Access token was invalid");
  }
}
