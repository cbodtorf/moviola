import { createLogger } from '@moviola/util-logger';
import fastify from 'fastify';
import healthCheck from 'fastify-custom-healthcheck';
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

  app.register(import('@fastify/cors'), (_instance) => {
    return (_req, callback) => {
      const corsOptions = {
        origin: (origin, cb) => {
          const hostname = new URL(origin).hostname;
          if (
            // Request from localhost will pass in development
            (hostname === 'localhost' &&
              process.env.NODE_ENV === 'development') ||
            hostname === process.env.FRONTEND_HOST
          ) {
            cb(null, true);
            return;
          }
          // Generate an error on other origins, disabling access
          cb(new Error('Not allowed'), false);
        }
      };

      // callback expects two parameters: error and options
      callback(null, corsOptions);
    };
  });

  // Register routes for frontend
  app.register(routes, { prefix: `/api` });

  return app;
}
