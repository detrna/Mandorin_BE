import "dotenv/config";

export const cookieHelper = {
  sendToken: (res, token) => {
    res.cookie("refreshToken", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      secure: process.env.COOKIE_SECURE,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  },
  clearToken: (res, token) => {
    res.clearCookie("refreshToken", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      secure: process.env.COOKIE_SECURE,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  },
};
