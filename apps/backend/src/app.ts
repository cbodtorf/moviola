import { createLogger } from '@moviola/util-logger';
import fastify from 'fastify';
import healthCheck from 'fastify-custom-healthCheck';
import { fastifyYupSchema } from "fastify-yup-schema";
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
    bodyLimit: MAX_DOCUMENT_SIZE,
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
      env: process.env.NODE_ENV,
    },
  });

  // Register routes for frontend
  app.register(routes, { prefix: `/api` });

  return app;
}
