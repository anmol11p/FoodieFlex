import { Router } from "express";
import {
  addTheProuduct,
  viewProduct,
  viewProductByCategory,
} from "../controller/MenuController.js";
import { itemZodSchema } from "../model/zod.schema.js";
import { zodMiddleware } from "../Middleware/zodMiddleware.js";
import authMiddleware from "../Middleware/AuthMiddleware.js";
import { adminMiddleware } from "../Middleware/AdminMiddleware.js";

const menuRouter = Router();

// add the product and view the product

menuRouter
  .route("/")
  .post(
    authMiddleware,
    adminMiddleware,
    zodMiddleware(itemZodSchema),
    addTheProuduct
  )
  .get(viewProduct);

// viewProduct by help of category
menuRouter.route("/:category").get(viewProductByCategory);

export default menuRouter;
