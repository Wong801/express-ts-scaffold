import ApiResponse from 'api/api-response';
import Cache from 'api/modules/cache';
import IAM from 'api/modules/iam';

export {};

declare global {
  namespace Express {
    interface Response {
      isLogin: boolean;
      isLogout: boolean;
      isFound: boolean;
    }
    interface Locals {
      response: ApiResponse;
      modules: {
        iam?: IAM;
        cache?: Cache;
      };
      user?: {
        userId?: string;
        isPremium?: boolean;
      };
    }
  }
}