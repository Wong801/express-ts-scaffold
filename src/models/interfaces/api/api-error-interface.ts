export interface IApiError extends Error {
  json(): Record<string, any>
}