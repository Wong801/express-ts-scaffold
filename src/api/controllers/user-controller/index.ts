import { Request, RequestHandler, Response } from "express";
import Controller from "..";
import UserService from "services/user-service";
import { UserEmailCheckSchema, UserLoginSchema, UserPhoneNUmberCheckSchema, UserRegisterSchema } from "models/schemas/joi/user-joi";
import environment from "engine/environment";

export default class UserController extends Controller<UserService> {
  constructor(service: UserService = new UserService()) {
    super({ service })
  }

  checkEmail(): RequestHandler {
    return async (req, res) => {
      const { value } = this.validateRequest(UserEmailCheckSchema, req.body)

      if (await this.service.checkUser({ json: value })) {
        res.locals.response.setResults({
          data: {
            isAvailable: true
          }
        })
      }
    }
  }

  checkPhoneNumber(): RequestHandler {
    return async (req, res) => {
      const { value } = this.validateRequest(UserPhoneNUmberCheckSchema, req.body)

      if (await this.service.checkUser({ json: value })) {
        res.locals.response.setResults({
          data: {
            isAvailable: true
          }
        })
      }
    }
  }

  register(): RequestHandler {
    return async (req, res) => {
      const { value } = this.validateRequest(UserRegisterSchema, req.body)

      if (await res.locals.modules.iam?.Register(value)) {
        res.locals.response.setResults({
          status: 201,
          data: {
            success: true
          }
        })
      }
    }
  }

  login(): RequestHandler {
    return async (req, res) => {
      const { value } = this.validateRequest(UserLoginSchema, req.body)

      const userId = await res.locals.modules.iam?.Authenticate(value) as string
      const token = res.locals.modules.iam?.CraftToken({ userId, duration: environment.cookie.duration, privateKey: environment.encrypt.secret })

      res.isLogin = true
      res.locals.response.setResults({
        data: token
      })
    }
  }
}