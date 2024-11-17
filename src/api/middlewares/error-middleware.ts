import { ErrorRequestHandler } from "express"

export default function(): ErrorRequestHandler {
  return (err, req, res, next) => {
    res.locals.response.setResults({
      error: err,
      status: err.status || 500
    })
    res.status(err.status).json(res.locals.response.json());
    return next()
  }
}