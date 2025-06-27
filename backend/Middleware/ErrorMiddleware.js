const ErrorMiddleware = (err, req, res, next) => {
  try {
    const status = err.status || 400;
    const message = err.message || "error in errorMiddleware";
    return res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};
export default ErrorMiddleware;
