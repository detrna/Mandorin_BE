import jwt from "jsonwebtoken";
import "dotenv/config";

export const jwtHelper = {
  signAccess: (user) => {
    const payload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };
    return jwt.sign(payload, process.env.JWT_ACCESS_KEY, { expiresIn: "5m" });
  },
  signRefresh: (user, jti) => {
    const payload = {
      jti,
      id: user.id,
      name: user.name,
      role: user.role,
    };
    return jwt.sign(payload, process.env.JWT_REFRESH_KEY, { expiresIn: "7d" });
  },
  verifyAccess: (token) => jwt.verify(token, process.env.JWT_ACCESS_KEY),
  verifyRefresh: (token) => jwt.verify(token, process.env.JWT_REFRESH_KEY),
};
