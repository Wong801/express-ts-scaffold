import { RequestHandler } from "express";

export default function(): RequestHandler {
  return (req, res, next) => {
    if (req.headers.cookie) {
      const cookies = req.headers.cookie.split('; ');
      const token = cookies.reduce((results, item) => { const data = item.trim().split('='); return { ...results, [data[0]]: data[1] }; }, {});
      req.cookies = token;
    }
    next();
  };
}