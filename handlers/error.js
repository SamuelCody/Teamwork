function errorHandler(err, req, res, next) {
  return res.status(err.status || 500).json({
    error: {
      status: "error",
      error: err.message || "Oops, something went wrong.",
    },
  });
}

module.exports = errorHandler;
