/**
 * @description Returns a string representation of the error message. If the error is not a string or Error, returns null
 *
 * @param error
 * @returns string | null
 */
export const getErrorMessage = (error: unknown): string | null => {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return null;
};
/**
 * @description Returns a string representation of the error stack. If the error is not a string or Error, returns null
 *
 * @param error
 * @returns string | null
 */
export const getErrorStack = (error: unknown): string | null => {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.stack || '';
  }

  return null;
};
