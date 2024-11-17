import ApiError from "api/api-error"
import environment from "engine/environment"
import { RequestHandler } from "express"

export default function(): RequestHandler {
  return (req, res, next) => {
    if (!res.isFound) return next(new ApiError('Feature not found', 404))

    if (res.isLogin) {
      const data = res.locals.response.results as Record<string, any>
      const expiration = new Date()
      expiration.setHours(expiration.getHours() + environment.cookie.duration)

      res.cookie('auth', data.jwt, {
        domain: environment.cookie.domain,
        secure: true,
        httpOnly: true,
        expires: expiration
      })

      res.cookie('xsrf', data.xsrf, {
        domain: environment.cookie.domain
      })

      res.locals.response.setResults({ data: { success: true } })
      res.locals.response.send(res)
      return next()
    }

    res.locals.response.send(res)
    return next()
  }
}