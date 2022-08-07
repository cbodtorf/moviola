import { createLogger, getLogLevel } from './logger';
import { mockChild } from '../__mocks__/pino';

let oldEnv: NodeJS.ProcessEnv;

describe('logger', () => {
  describe('createLogger', () => {
    it('should return a child logger', () => {
      createLogger('test');

      expect(mockChild).toHaveBeenCalledWith({
        componentName: 'test'
      });
    });
  });

  describe('getLogLevel', () => {
    beforeAll(() => {
      oldEnv = process.env;
    });

    afterAll(() => {
      process.env = oldEnv;
    });

    it('should return info in production', () => {
      process.env.NODE_ENV = 'production';

      const level = getLogLevel();

      expect(level).toEqual('info');
    });

    it('should return debug in development', () => {
      process.env.NODE_ENV = 'development';

      const level = getLogLevel();

      expect(level).toEqual('debug');
    });

    it('should return silent when no env var is present', () => {
      process.env.NODE_ENV = undefined;

      const level = getLogLevel();

      expect(level).toEqual('silent');
    });

    it('should return the log level if it is defined', () => {
      process.env.LOG_LEVEL = 'log';

      const level = getLogLevel();

      expect(level).toEqual('log');
    });
  });
});
