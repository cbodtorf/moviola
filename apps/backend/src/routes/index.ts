import { Logger } from '@moviola/util-logger';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { movies } from './movies';

/**
 * @description Aggregates all routes for our app.
 * We are leveraging the prefix option handle route versioning.
 *
 * @param app - Fastify app instance
 * @param _opts - unused options
 * @param done - function that marks the end of this registered process
 */
export function routes(
  app: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: (err?: Error) => void
) {
  app.register(movies, { prefix: 'v1/movies' });

  // The resource can be versioned by registering a new set of routes with the new prefix, while still supporting the old version.
  // Example:
  // app.register(moviesV2, { prefix: 'v2/movies' });

  done();
}
