export default function response(res, statusCode, data, message) {
  const getMeta = () => ({ timestamp: new Date().toISOString() });
  const payload = {
    success: statusCode >= 200 && statusCode < 300,
    data,
    message,
    metadata: getMeta(),
  };

  res.status(statusCode).json(payload);
}
