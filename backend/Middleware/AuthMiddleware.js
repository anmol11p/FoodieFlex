import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(404).json({ message: "token is not founded..!" });
    }
    token = token.replace("Bearer ", "");
    const tokenData = jwt.verify(token, process.env.SecretKey);
    req.user = tokenData.id;
    next();
  } catch (error) {
    const status = 400;
    const message = error?.message || "error in auth middleware";
    const err = { message, status };
    next(err);
  }
};

export default authMiddleware;
