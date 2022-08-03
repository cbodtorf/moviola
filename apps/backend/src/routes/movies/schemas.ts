/**
 * @description JSON schema for movieObject
 * 
 * based on this dataset: https://gist.github.com/praagyajoshi/3a1c652667920924e6e399bf039d339d
 */
export const movieObject = {
  type: 'object',
  properties: {
    objectID: {
      type: 'string'
    },
    title: {
      type: 'string',
    },
    alternative_titles: {
      type: 'array', items: { type: 'string' }
    },
    year: {
      type: 'number',
      minimum: 1888
    },
    image: {
      type: 'string',
      format: 'uri'
    },
    color: {
      type: 'string',
      pattern: '^#(?:[0-9a-fA-F]{3}){1,2}$'
    },
    score: {
      type: 'number',
      minimum: 0,
      maximum: 10,
    },
    rating: {
      type: 'number',
      minimum: 0,
      maximum: 5,
    },
    actors: {
      type: 'array', items: { type: 'string' }
    },
    actor_facets: {
      type: 'array', items: { type: 'string', format: 'uri' }
    },
    genre: {
      type: 'array', items: { type: 'string' }
    },
  },
  additionalProperties: false
}

/**
 * @description JSON schema for movieInput
 * 
 * based on this dataset: https://gist.github.com/praagyajoshi/3a1c652667920924e6e399bf039d339d
 */
export const movieInput = {
  body: {
    type: 'object',
    required: [ 'movie' ],
    properties: {
      movie: movieObject
    },
    additionalProperties: false
  }
}