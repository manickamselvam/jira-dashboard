const errorHandler = (err, req, res, next) => {
  console.log('error handler called');

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Optional: log error details for debugging
  console.error(
    `[${req.method}] ${req.originalUrl} → ${statusCode}: ${message}`
  );

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
