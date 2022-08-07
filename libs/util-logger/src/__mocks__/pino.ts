export const mockInfo = jest.fn();
export const mockDebug = jest.fn();
export const mockError = jest.fn();
export const mockFatal = jest.fn();
export const mockWarn = jest.fn();
export const mockTrace = jest.fn();

export const mockChild = jest.fn().mockImplementation(() => ({
  info: mockInfo,
  debug: mockDebug,
  error: mockError,
  fatal: mockFatal,
  warn: mockWarn,
  trace: mockTrace
}));

const pino = jest.fn().mockImplementation(() => ({
  child: mockChild,
  info: mockInfo,
  debug: mockDebug,
  error: mockError,
  fatal: mockFatal,
  warn: mockWarn,
  trace: mockTrace
}));

export default pino;
