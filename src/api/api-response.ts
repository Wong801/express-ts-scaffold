import { IApiResponse, Metadata } from 'models/interfaces/api/api-response-interface';
import ApiError from './api-error';
import { Response } from 'express';


export default class ApiResponse implements IApiResponse {
  public status: number
  public metadata: Metadata
  public results: null | Record<string, any>

  constructor() {
    this.status = 200;
    this.metadata = {
      error: null,
    };
    this.results = null;
  }

  setResults({
    data = null, error = null, status = 200,
  }: { data?: Record<string, any> | null, error?: ApiError | null, status?: number }) {
    this.results = data;
    this.metadata.error = error;
    if (status) this.status = status;
  }
  
  setErrorResults({ data, status }: { data: ApiError, status: number }) {
    this.metadata.error = data;
    this.status = status;
  }

  json() {
    if (this.metadata.error) {
      if (this.metadata.error instanceof ApiError) {
        this.metadata.error = (this.metadata.error as ApiError).json()
      } else {
        this.metadata.error = new ApiError(this.metadata.error.message).json();
      }
    }
    return {
      metadata: this.metadata,
      results: this.results,
    };
  }

  send(res: Response) {
    res.status(this.status);
    return res.send(this.json());
  }
}