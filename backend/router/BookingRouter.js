import { Router } from "express";
import authMiddleware from "../Middleware/AuthMiddleware.js";
import {
  cancelOrder,
  orderBook,
  showAllOrder,
} from "../controller/BookingController.js";
import { zodMiddleware } from "../Middleware/zodMiddleware.js";
import { userOrderSchema } from "../model/zod.schema.js";

const bookingRouter = Router();

// order book
bookingRouter
  .route("/")
  .post(authMiddleware, zodMiddleware(userOrderSchema), orderBook);

// see all order

bookingRouter.route("/show").get(authMiddleware, showAllOrder);
// cancel the order
bookingRouter.route("/cancel/:id").patch(authMiddleware, cancelOrder);
export default bookingRouter;
