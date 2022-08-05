import Axios, { AxiosInstance } from 'axios';
import { ApiConfiguration } from './types';

export function handleServiceError(error) {
  console.log('Error',
    error?.response?.data?.message || error
  )
}

export default class ApiClient {
  private client: AxiosInstance;

  constructor(apiConfiguration: ApiConfiguration, ) {
    this.client = Axios.create({
      baseURL: apiConfiguration.baseURL,
      responseType: 'json' as const,
      headers: {
        'Content-Type': 'application/json',
        ...apiConfiguration.headers
      },
      timeout: apiConfiguration.timeout || 10 * 1000,
    });
  }

  async post<TRequest, TResponse>(
    path: string,
    payload: TRequest
  ): Promise<TResponse> {
    try {
      const response = await this.client.post<TResponse>(path, payload)
      return response.data;
    } catch (error) {
      handleServiceError(error);
    }
  }

  async put<TRequest, TResponse>(
    path: string,
    payload: TRequest
  ): Promise<TResponse> {
    try {
      const response = await this.client.put<TResponse>(path, payload);
      return response.data;
    } catch (error) {
      handleServiceError(error);
    }
  }

  async get<TResponse>(path: string): Promise<TResponse> {
    try {
      const response = await this.client.get<TResponse>(path);
      return response.data;
    } catch (error) {
      handleServiceError(error);
    }
  }

  async delete<TResponse>(
    path: string
  ): Promise<TResponse> {
    try {
      const response = await this.client.delete<TResponse>(path)
      return response.data;
    } catch (error) {
      handleServiceError(error);
    }
  }
}