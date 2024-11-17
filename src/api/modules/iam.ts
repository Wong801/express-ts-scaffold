import jwtStd from 'jsonwebtoken';
import crypto from 'crypto';
import ApiError from '../api-error';
import Module from 'api/modules';
import db from 'engine/db';
import { checkPin, hashPin } from 'utils';
import { JwtPayload } from 'models/interfaces/api/iam-interface';

export default class IAM extends Module {
  public jwt: typeof jwtStd
  public prisma: typeof db

  constructor({ jwt = jwtStd, prisma = db } = {}) {
    super()
    this.name = 'IAM';
    this.warnings = '';
    this.jwt = jwt;
    this.prisma = prisma;
  }

  generateXsrf() {
    return crypto.randomBytes(32).toString('hex');
  }

  CraftToken({ userId, duration, privateKey }: { userId: string, duration: number, privateKey: string }) {
    const xsrf = this.generateXsrf();
    if (typeof userId !== 'string') throw new ApiError('User must be a string', 400);
    const token = this.jwt.sign({
      sub: userId,
      iat: Date.now(),
      exp: duration,
      xsrf,
    }, privateKey, {
      algorithm: 'HS256',
    });
    return {
      jwt: token,
      xsrf,
    };
  }

  async Authenticate({ identifier, pin }: { identifier: string, pin: string }) {
    const userData = await this.prisma.user.findFirst({ 
      where: { 
        OR: [
          {
            email: identifier
          },
          {
            phoneNumber: identifier
          }
        ] 
      } 
    })
    if (!userData) throw new ApiError('Invalid credentials', 400);
    const hashedPin = hashPin(pin)

    if (!checkPin(pin, hashedPin)) {
      throw new ApiError('Invalid credentials', 400);
    }
    return userData.userId;
  }

  async Register({ username, phoneNumber, email, pin }: { username: string, phoneNumber: string, email?: string, pin: string }) {
    const userData = await this.prisma.user.findFirst({ 
      where: {
        OR: [
          {
            username
          },
          {
            phoneNumber
          },
          ...(email ? [{email}] : [])
        ]
      }
    })

    if (userData) throw new ApiError('User already exists', 400);

    await this.prisma.user.create({
      data: {
        username,
        phoneNumber,
        pin: hashPin(pin),
        ...(email && ({ email }))
      }
    })
    return true;
  }

  async VerifyToken({ token, privateKey, xsrf = null }: { token: string, privateKey: string, xsrf?: string | null }) {
    try {
      const decoded: JwtPayload = this.jwt.verify(token, privateKey, {
        algorithms: ['HS256'],
      }) as JwtPayload;

      if (decoded.xsrf !== xsrf) throw new ApiError('Invalid XSRF token', 401);

      const issuedDate = new Date(decoded.iat)
      issuedDate.setHours(issuedDate.getHours() + decoded.exp)

      if (issuedDate.getTime() < (new Date()).getTime()) throw new ApiError('Token expired', 401);

      return decoded.sub;
    } catch (e) {
      if (e instanceof ApiError) throw e;
      throw new ApiError('Invalid token', 401);
    }
  }

  IsUserAuthorized({
    // eslint-disable-next-line
    userId, action, resource, rootBypass, userIp
  }: { userId?: string, action?: string, resource?: string, rootBypass?: string, userIp?: string } = {}) {
    if (userId) return true;
    return false;
  }
}