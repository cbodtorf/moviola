import { createYupSchema } from 'fastify-yup-schema';
import { object, string, number, array, InferType } from 'yup';

const baseAddMovieSchema = {
  title: string().required(),
  alternative_titles: array(string().required())
    .max(50)
    .default(() => []),
  year: number().min(1888).max(2888).required(),
  image: string().url(),
  color: string().matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/),
  score: number().min(0).max(10).required().positive().default(0),
  rating: number().min(0).max(5).required().positive().integer().default(0),
  actors: array(string().required())
    .max(50)
    .default(() => []),
  actor_facets: array(string())
    .max(50)
    .default(() => []),
  genre: array(string().required())
    .max(5)
    .default(() => [])
};

const baseUpdateMovieSchema = {
  objectID: string(),
  title: string(),
  alternative_titles: array(string().required()).max(50),
  year: number().min(1888).max(2888),
  image: string().url(),
  color: string().matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/),
  score: number().min(0).max(10).positive(),
  rating: number().min(0).max(5).positive().integer(),
  actors: array(string().required()).max(50),
  actor_facets: array(string()).max(50),
  genre: array(string().required()).max(5)
};

// Add Schema
export const movieAddSchema = object({
  ...baseAddMovieSchema
});

export const movieAddInputSchema = object({
  movie: object({
    ...baseAddMovieSchema
  })
});

export const movieAddFastifySchema = createYupSchema(() => {
  return {
    body: object({
      movie: object({
        ...baseAddMovieSchema
      })
    })
  };
});

// Update Schema
export const movieUpdateSchema = object({
  ...baseUpdateMovieSchema
});

export const movieUpdateInputSchema = object({
  movie: object({
    ...baseUpdateMovieSchema
  })
});

export const movieUpdateFastifySchema = createYupSchema(() => {
  return {
    body: object({
      movie: object({
        ...baseUpdateMovieSchema
      })
    })
  };
});

export type MovieAddInput = InferType<typeof movieAddInputSchema>;
export type MovieAdd = InferType<typeof movieAddSchema>;

export type MovieUpdateInput = InferType<typeof movieUpdateInputSchema>;
export type MovieUpdate = InferType<typeof movieUpdateSchema>;
