import express from "express";
import cors from "cors";
import dbconnect from "./connection/connection.js";
import AuthRouter from "./router/Authrouter.js";
import ErrorMiddleware from "./Middleware/ErrorMiddleware.js";
import menuRouter from "./router/MenuRouter.js";
import bookingRouter from "./router/BookingRouter.js";
const app = express();

app.use(cors());
app.use(express.json());
await dbconnect();
// authentication middleware
app.use("/auth", AuthRouter);
//menu middleware
app.use("/item", menuRouter);

app.use("/book", bookingRouter);
// error middleware
app.use(ErrorMiddleware);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is listening at http://localhost:${PORT}/`);
});
