import express, { NextFunction, Request, Response } from "express";
import userRoute from "./routes/userRoutes/userRoute";
import orderRoute from "./routes/orderRoutes/orderRoutes";
import AppError from "./utils/AppError";

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log("Testing middleware");

  next();
});

app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);

app.use((req, res, next) => {
  res.json({ msg: `Cannot find that route ${req.originalUrl} on this server` });

  next();
});

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: "error",
    message: err.isOperational ? err.message : "Internal Server Error",
  });
});

export default app;
