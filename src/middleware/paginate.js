export const paginate = (defaultLimit = 5, maxLimit = 50) => {
  return (req, res, next) => {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || defaultLimit;

    if (page < 1) page = 1;
    if (limit < 1) limit = 1;
    if (limit > maxLimit) limit = maxLimit;

    const offset = (page - 1) * limit;

    req.pagination = {
      page,
      offset,
      limit,
    };
    next();
  };
};
