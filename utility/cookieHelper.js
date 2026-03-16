export const cookieHelper = {
  sendToken: (res, token) => {
    res.cookie("refresh_token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  },
};
