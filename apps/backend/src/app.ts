import { createLogger } from "@moviola/logger";
import fastify from "fastify";
import healthCheck from 'fastify-custom-healthCheck';
import { AlgoliaService } from "./algolia/service";
import { routes } from "./routes";
  
export default function build(opts: Record<string, unknown> = {}) {
  const logger = createLogger('backend-app');  
  const MAX_DOCUMENT_SIZE = 32_000_000;

  // Initialize app
  const app = fastify({
    ...opts,
    bodyLimit: MAX_DOCUMENT_SIZE
  });

  // Add algolia client
  const algoliaService = new AlgoliaService(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_ADMIN_API_KEY,
    process.env.ALGOLIA_INDEX_NAME
  );
  app.decorate('algoliaService', algoliaService);

  // Add logger
  app.decorate('logger', logger);
  
  // Register healthCheck
  app.register(healthCheck, {
    path: '/health',
    info: {
      name: 'Backend Health Check',
      env: process.env.NODE_ENV,
    },
  });
  
  app.register(routes, { prefix: `/api`});

  return app;
}