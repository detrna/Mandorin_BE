import response from "../utility/response.js";

export const roleGuard = (role) => {
  return (req, res, next) => {
    const user = req.user;
    if (user.role !== role) response(res, 401, {}, "User unauthorized");
    next();
  };
};
