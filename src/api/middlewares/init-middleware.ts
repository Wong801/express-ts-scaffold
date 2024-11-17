import ApiResponse from "api/api-response";
import Module from "api/modules";
import { RequestHandler } from "express";

export default function({ modules = {} }: { modules?: Record<string, Module> } = {}): RequestHandler {
  return (req, res, next) => {
    res.locals.modules = modules
    res.locals.response = new ApiResponse();
    res.isFound = false
    next();
  };
}