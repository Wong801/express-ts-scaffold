import ApiError from "api/api-error";
import Joi from "joi";
import { IController } from "models/interfaces/api/controller-interface";
import Service from "services";

export default class Controller<T extends Service> implements IController {
  readonly service: T

  constructor({ service }: { service: T }) {
    this.service = service
  }

  validateRequest(schema: Joi.ObjectSchema<any>, payload: any): Joi.ValidationResult<any> {
    const validation = schema.validate(payload);
    
    if (validation.error) {
      throw new ApiError(validation.error.details[0].message, 400, validation.error)
    }
    
    return validation
  }
}