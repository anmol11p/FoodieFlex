export const zodMiddleware = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error.name === "ZodError") {
      const formattedErrors = error.errors.map((err) => ({
        field: err.path[0],
        message: err.message,
      }));
      return res.status(400).json({ errors: formattedErrors });
    }
    next(error);
  }
};
