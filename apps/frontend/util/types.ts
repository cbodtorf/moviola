export type HttpHeaders = {
  [key: string]: string;
};

export class ApiConfiguration {
  baseURL: string;
  headers?: Record<string,string>;
  timeout?: number;
}