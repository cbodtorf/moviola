/* eslint-disable @typescript-eslint/no-explicit-any */
import pino from 'pino';

interface LogFn {
  <T extends object>(obj: T, msg?: string, ...args: any[]): void;
  (msg: string, ...args: any[]): void;
}
export interface Logger {
  fatal: LogFn;
  error: LogFn;
  warn: LogFn;
  info: LogFn;
  debug: LogFn;
  trace: LogFn;
  context: Record<string, unknown>;
}

export const getLogLevel = (): string => {
  if (process.env.LOG_LEVEL) {
    return process.env.LOG_LEVEL;
  }

  const nodeEnv = process.env.NODE_ENV;
  if (nodeEnv === 'production') {
    return 'info';
  }

  if (nodeEnv === 'development' || nodeEnv === 'local') {
    return 'debug';
  }

  return 'silent';
};

export const createLogger = (componentName: string): Logger => {
  const pinoLogger = pino({
    level: getLogLevel(),
    formatters: {
      level(level) {
        return { level };
      }
    },
    mixin() {
      return { context: logger.context };
    }
  });

  const child = pinoLogger.child({ componentName });
  const logger: Logger = {
    fatal: child.fatal.bind(child),
    error: child.error.bind(child),
    warn: child.warn.bind(child),
    info: child.info.bind(child),
    debug: child.debug.bind(child),
    trace: child.trace.bind(child),
    context: {}
  };
  return logger;
};
