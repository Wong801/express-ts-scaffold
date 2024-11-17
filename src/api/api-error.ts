import type { IApiError } from 'models/interfaces/api/api-error-interface'

export default class ApiError extends Error implements IApiError {
  readonly status: number
  readonly developerMessage?: string
  
  constructor(message: string, status: number = 500, developerMessage: any = '') {
    super(message)
    this.status = status
    this.developerMessage = developerMessage
  }

  json(): Record<string, any> {
    return {
      message: this.message,
      developerMessage: this.developerMessage
    }
  }
}