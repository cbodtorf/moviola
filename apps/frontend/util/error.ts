import { ErrorType } from './types';

/**
 * @description Custom Error for certain scenarios like when an api request fails.
 */
export class MoviolaError extends Error {
  type: ErrorType;
  constructor(type: ErrorType, message: string) {
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MoviolaError);
    }

    this.type = type;
  }
}
