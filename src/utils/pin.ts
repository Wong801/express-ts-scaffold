import bcrypt from 'bcrypt'
import crypto from 'crypto';
import environment from 'engine/environment'

const hashPin = (pin: string) => {
  return crypto.createHmac('sha256', environment.encrypt.secret).update(`${environment.encrypt.salt}${pin}`).digest('base64')
}

const checkPin = (pin: string, encrypted: string) => {
  const hashedPin = hashPin(pin)
  return encrypted === hashedPin
}

export {
  hashPin,
  checkPin
}