import csurf from "csurf";
import { Request, Response } from "express";

export const csurfProtection = csurf({ cookie: true });

export const getCsurlfCookie = async (req: Request, res: Response) => {
  res.status(200).json({ csrfToken: (req as any).csrfToken() });
};
