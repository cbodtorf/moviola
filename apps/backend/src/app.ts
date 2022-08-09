import { createLogger } from '@moviola/util-logger';
import fastify from 'fastify';
import healthCheck from 'fastify-custom-healthcheck';
import cors from '@fastify/cors';
import { fastifyYupSchema } from 'fastify-yup-schema';
import { AlgoliaService } from './algolia/service';
import { environment } from './environments/environment';
import { routes } from './routes';

export default function build(opts: Record<string, unknown> = {}) {
  const logger = createLogger('backend-app');
  // Arbitrary document size
  const MAX_DOCUMENT_SIZE = 32_000_000;

  // Production builds will pull appropriate environments
  // See `project.json` for replacement pattern
  const algoliaSecrets = environment.algolia;

  // Initialize app
  const app = fastify({
    ...opts,
    bodyLimit: MAX_DOCUMENT_SIZE
  });

  // Add algolia client
  const algoliaService = new AlgoliaService(
    algoliaSecrets.appID,
    algoliaSecrets.adminKey,
    algoliaSecrets.indexName
  );
  app.decorate('algoliaService', algoliaService);

  // Add logger
  app.decorate('logger', logger);

  // Use Yup Schema for validation
  app.register(fastifyYupSchema);

  // Register healthCheck
  app.register(healthCheck, {
    path: '/health',
    info: {
      name: 'Backend Health Check',
      env: process.env.NODE_ENV
    }
  });

  // Allow cors for certain scenarios
  // Dev -> we allow undefined and localhost
  // Prod -> we allow env for FRONTEND_HOST
  app.register(cors, {
    origin: (
      origin: string | undefined,
      cb: (err: Error | null, allow: boolean) => void
    ) => {
      if (
        process.env.NODE_ENV === 'development' &&
        (typeof origin === 'undefined' || /localhost/.test(origin))
      ) {
        cb(null, true);
        return;
      }

      if (
        process.env.NODE_ENV === 'production' &&
        (typeof origin === 'undefined' ||
          origin === (process.env.FRONTEND_HOST || ''))
      ) {
        cb(null, true);
        return;
      }

      logger.warn({ origin }, 'Warn: Request coming from invalid origin');
      cb(new Error(), false);
    }
  });

  // Register routes for frontend
  app.register(routes, { prefix: `/api` });

  return app;
}
