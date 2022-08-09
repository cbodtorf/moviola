import { getErrorMessage, getErrorStack, Logger } from '@moviola/util-logger';
import {
  movieAddFastifySchema,
  movieUpdateFastifySchema
} from '@moviola/util-schemas';
import { SearchIndex } from 'algoliasearch';
import { FastifyInstance, FastifyPluginOptions, FastifyReply } from 'fastify';

/**
 * @description Defines some routes for our Movies resource.
 * We register these routes in the index.ts of our ./routes directory
 *
 * @param app - Fastify app instance
 * @param _opts - unused options
 * @param done - function that marks the end of this registered process
 */
export const movies = (
  app: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: (err?: Error) => void
) => {
  app.post('/', { schema: movieAddFastifySchema }, addHandler);
  app.put('/:id', { schema: movieUpdateFastifySchema }, updateHandler);
  app.delete('/:id', {}, removeHandler);

  done();
};

/**
 * @description Definds how we handle POST requsts for adding new movies to the index
 *
 * @param req - Request object with body for Movie input object to add to index
 * @param reply - Reply object that allows us to repond to API requeset
 * @returns response object for endpoint
 */
export async function addHandler(req, reply: FastifyReply) {
  const algolia: SearchIndex = this.algoliaService.index;
  const log: Logger = this.logger;

  try {
    log.info({ body: req.body }, `Adding new item to ${algolia.indexName}`);

    // TODO: (V2) generate our own uuid, and save items in our own database before indexing to algolia.
    const res = await algolia.saveObject(req.body.movie, {
      autoGenerateObjectIDIfNotExist: true
    });

    reply.code(202).send({
      ...res,
      success: true
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    log.debug(
      {
        error: errorMessage,
        stack: getErrorStack(error)
      },
      'Unknown Error'
    );

    reply.code(500).send({
      message: errorMessage
    });
  }
}

/**
 * @description Definds how we handle PUT requsts for updating movies in the index
 *
 * @param req - Request object with ID in url params and body for Movie input object including only properties to update
 * @param reply - Reply object that allows us to repond to API requeset
 * @returns response object for endpoint
 */
export async function updateHandler(req, reply: FastifyReply) {
  const algolia: SearchIndex = this.algoliaService.index;
  const log: Logger = this.logger;

  try {
    const { id } = req.params;

    log.info({ body: req.body, id }, `Updating item to ${algolia.indexName}`);

    const res = await algolia.partialUpdateObject(
      {
        ...req.body.movie,
        objectID: id
      },
      {
        createIfNotExists: false
      }
    );

    log.info({ res }, `Updated item to ${algolia.indexName}`);

    reply.code(202).send({
      ...res,
      success: true
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    log.debug(
      {
        error: errorMessage,
        stack: getErrorStack(error)
      },
      'Unknown Error'
    );

    reply.code(500).send({
      message: errorMessage
    });
  }
}

/**
 * @description Definds how we handle DELETE requsts for removing movies from the index
 *
 * @param req - Request object with ID for Movie to remove
 * @param reply - Reply object that allows us to repond to API requeset
 * @returns response object for endpoint
 */
export async function removeHandler(req, reply: FastifyReply) {
  const algolia: SearchIndex = this.algoliaService.index;
  const log: Logger = this.logger;

  try {
    const { id } = req.params;

    log.info({ id }, `Deleting item to ${algolia.indexName}`);

    const res = await algolia.deleteObject(id);

    reply.code(202).send({
      ...res,
      success: true
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    log.debug(
      {
        error: errorMessage,
        stack: getErrorStack(error)
      },
      'Unknown Error'
    );

    reply.code(500).send({
      message: errorMessage
    });
  }
}
