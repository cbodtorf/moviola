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
