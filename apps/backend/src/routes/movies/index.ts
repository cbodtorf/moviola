import { SearchIndex } from 'algoliasearch';
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply
} from 'fastify';
import { movieInput } from './schemas';

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

  app.post('/', { schema: movieInput }, addHandler)
  app.put('/:id', { schema: movieInput }, updateHandler)
  app.delete('/:id', {}, removeHandler)

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
  
  try {
    const res = await algolia.saveObject(
      req.body.movie
    );

    return reply.code(204).send({
      ...res,
      success: true
    });
  } catch (error) {
    req.log.error(error);
    return reply.send(500);
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

  try {
    const { id } = req.params;
    const res = await algolia.partialUpdateObject({
      ...req.body.movie,
      objectID: id
    });

    return reply.code(204).send({
      ...res,
      success: true
    });
  } catch (error) {
    req.log.error(error);
    return reply.send(500);
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

  try {
    const { id } = req.params;
    const res = await algolia.deleteObject(id);

    return reply.code(204).send({
      ...res,
      success: true
    });
  } catch (error) {
    req.log.error(error);
    return reply.send(500);
  }
}