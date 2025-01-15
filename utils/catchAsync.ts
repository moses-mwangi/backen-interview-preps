import { NextFunction, Request } from "express";

const catchAsyncError =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);

export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
