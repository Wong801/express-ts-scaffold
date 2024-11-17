import { NextFunction, Request, RequestHandler, Response } from "express";
import ApiError from "api/api-error";

export default function(cb: RequestHandler) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.isFound = true
      await cb(req, res, next)
      next()
    } catch (error) {
      if (error instanceof ApiError) {
        next(error)
      } else {
        next(new ApiError('Internal Server Error', 500, (error as Error).message))
      }
    }
  }
}