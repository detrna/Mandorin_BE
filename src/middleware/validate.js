import response from "../utility/response.js";

export const validate = (schema, source = "body") => {
  return (req, res, next) => {
    const { value, error } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      const errorMessage = error.details
        .map((details) => details.message.replace(/"/g, ""))
        .join(", ");
      return response(res, 400, {}, errorMessage);
    }
    req[source] = value;
    next();
  };
};
