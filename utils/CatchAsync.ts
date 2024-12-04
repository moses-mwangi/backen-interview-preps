import { NextFunction, Request, Response } from "express";

const catch_Async = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default catch_Async;
