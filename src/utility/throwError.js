export const throwError = (code, message) => {
  const error = new Error(message);
  error.code = code;
  return error;
};
