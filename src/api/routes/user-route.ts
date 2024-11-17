import { Router } from "express";
import defaultMiddleware from "api/middlewares/default-middleware";
import UserController from 'api/controllers/user-controller';

export default function loadUserRoutes({ router = Router() }: { router?: Router } = {}) {
  const controller = new UserController()

  router.post('/register', defaultMiddleware(controller.register()))
  router.post('/login', defaultMiddleware(controller.login()))
  router.post('/check/email', defaultMiddleware(controller.checkEmail()))
  router.post('/check/phone-number', defaultMiddleware(controller.checkPhoneNumber()))

  return router
}