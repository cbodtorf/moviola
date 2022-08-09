export type HttpHeaders = {
  [key: string]: string;
};

/**
 * @description Api configuration for ApiClient
 */
export class ApiConfiguration {
  baseURL: string;
  headers?: Record<string, string>;
  timeout?: number;
}

/**
 * @description MoviolaError types
 */
export enum ErrorType {
  API_ERROR = 'API_ERROR',
  RUNTIME_ERROR = 'RUNTIME_ERROR'
}
