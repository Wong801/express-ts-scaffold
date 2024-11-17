import ApiError from "api/api-error";
import { Response } from "express";

export interface Metadata {
  error: null | ApiError | Error | Record<string, any>
  [x: string]: any
}

export interface IApiResponse {
  setResults({ data, error, status }: { data?: Record<string, any> | null, error?: ApiError | null, status?: number }): void

  setErrorResults({ data, status }: { data: ApiError, status: number }): void

  json(): { metadata: Metadata, results: Record<string, any> | null }

  send(res: Response): any
}