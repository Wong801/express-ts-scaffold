import { User } from '@prisma/client'
import environment from 'engine/environment'
import jwt, { SignOptions } from 'jsonwebtoken'

const craftJwtToken = (payload: Pick<User, 'userId' | 'username'>, options: SignOptions = {}) => {
  return jwt.sign(payload, environment.encrypt.secret, {
    expiresIn: '1d',
    ...options
  })
}

const validateJwtToken = (token: string) => {
  return jwt.verify(token, environment.encrypt.secret)
}

export {
  craftJwtToken,
  validateJwtToken
}