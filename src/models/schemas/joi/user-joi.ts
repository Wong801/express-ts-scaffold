import Joi from "joi";
import { sanitizePhoneNumber } from "utils";

export const UserRegisterSchema = Joi.object({
  username: Joi.string().required(),
  phoneNumber: Joi.string().required().custom((value) => {
    const sanitized = sanitizePhoneNumber(value);
    return sanitized;
  }, 'Sanitize Phone Number'),
  email: Joi.string().email().optional().allow(null),
  pin: Joi.string().length(6).pattern(/^\d+$/).required()
}).meta({ className: 'UserRegisterPayload' })

export const UserPhoneNUmberCheckSchema = Joi.object({
  phoneNumber: Joi.string().required().custom((value) => {
    const sanitized = sanitizePhoneNumber(value);
    return sanitized;
  }, 'Sanitize Phone Number'),
}).meta({ className: 'UserPhoneNumberCheckPayload' })

export const UserEmailCheckSchema = Joi.object({
  email: Joi.string().email().required()
}).meta({ className: 'UserEmailCheckPayload' })

export const UserLoginSchema = Joi.object({
  identifier: Joi.string().required(),
  pin: Joi.string().length(6).pattern(/^\d+$/).required()
}).meta({ className: 'UserLoginPayload' })