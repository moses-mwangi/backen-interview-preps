import express, { Errback, NextFunction, Request, Response } from "express";
import rateLimiter from "express-rate-limit";
import xss from "xss-clean";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import fs from "fs";
import cors from "cors";

import csurlfRouter from "./routes/csurlfRoute";
import userRouter from "./routes/userRoute";

import appError from "./utils/appError";

const app = express();
app.set("trust proxy", 1);

//// MIDDLEWARE
const limiter = rateLimiter({
  max: 2,
  windowMs: 1 * 60 * 1000,
  message: "Too many requests from this IP. Please try again in an hour",
});

const cSP = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self';"
  );
  next();
};

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (allowedOrigins.includes(origin!) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(xss()); //// prevent xss by sanitizing data
app.use(helmet()); //// prevent xss,clickjacking,Set Security HTTPs Headers,Mime Sniffing
app.use(cSP); ///// prevent xss by preventimg by specifying which resourcesss is trusted / this can also be done using helmet
app.use("/api", limiter); //// Limit the number of request at a certain time to prevent
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log("Testing Middleware");
  next();
});

// app.use((err, req:Request, res:Response, next:NextFunction) => {
//   res.status(err.status || 500).json({
//     status: 'error',
//     message: err.message || 'Something went wrong!',
//   });
// });

app.use("/api/getCsrfToken", csurlfRouter);

app.use("/api/user", userRouter);

app.all("*", (req, res, next) => {
  next(new appError(`Cant find ${req.url} on this server`, 404));
});

app.use((err: appError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: `${statusCode}`.startsWith("4") ? "Fail" : "Error",
    message: err.isOperational ? err.message : "Internal Server Error",
  });
});

export default app;
