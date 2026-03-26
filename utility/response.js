export default function response(
  res,
  statusCode,
  data,
  message,
  pagination = null,
  success = null,
) {
  const getPageInfo = (pagination) => {
    const { page, limit, totalItems } = pagination;
    const totalPage = Math.ceil(totalItems / limit);

    return {
      totalItems,
      totalPage,
      currentPage: page,
      itemsPerPage: limit,
      hasNext: page < totalPage,
      hasPrev: page > 1 && page <= totalPage + 1,
    };
  };

  const getMeta = () => ({ timestamp: new Date().toISOString() });
  const payload = {
    success: success ?? (statusCode >= 200 && statusCode < 300),
    data,
    message,
    metadata: getMeta(),
  };

  if (pagination) payload.pagination = getPageInfo(pagination);

  res.status(statusCode).json(payload);
}
