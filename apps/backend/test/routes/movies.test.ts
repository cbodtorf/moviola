import { buildTestInstance } from '../helper';
import {
  mockSaveObject,
  mockPartialUpdateObject,
  mockDeleteObject
} from '../__mocks__/algoliasearch';
import { mockMovie } from '@moviola/util-schemas';

describe('movies', () => {
  const app = buildTestInstance();

  // Add
  describe('POST', () => {
    test('empty body', async () => {
      mockSaveObject.mockResolvedValue({
        objectID: 'myObjectID1',
        taskID: 678
      });

      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/movies'
      });

      expect(JSON.parse(res.payload)).toEqual({
        error: 'Bad Request',
        message:
          'this must be a `object` type, but the final value was: `null`.\n If "null" is intended as an empty value be sure to mark the schema as `.nullable()`',
        statusCode: 400
      });
    });

    test('required body', async () => {
      mockSaveObject.mockResolvedValue({
        objectID: 'myObjectID2',
        taskID: 678
      });

      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/movies',
        payload: {
          movie: mockMovie
        }
      });

      expect(JSON.parse(res.payload)).toEqual(
        expect.objectContaining({
          objectID: 'myObjectID2',
          taskID: 678,
          success: true
        })
      );
    });
  });

  // Update
  describe('PUT', () => {
    test('empty body', async () => {
      mockPartialUpdateObject.mockResolvedValue({
        objectID: 'myObjectID3',
        taskID: 678
      });

      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/movies/123'
      });

      expect(JSON.parse(res.payload)).toEqual({
        error: 'Bad Request',
        message:
          'this must be a `object` type, but the final value was: `null`.\n If "null" is intended as an empty value be sure to mark the schema as `.nullable()`',
        statusCode: 400
      });
    });

    test('required partial body', async () => {
      mockPartialUpdateObject.mockResolvedValue({
        objectID: 'myObjectID4',
        taskID: 678
      });

      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/movies/123',
        payload: {
          movie: {
            year: mockMovie.year,
            color: mockMovie.color,
            image: mockMovie.image
          }
        }
      });

      expect(JSON.parse(res.payload)).toEqual(
        expect.objectContaining({
          objectID: 'myObjectID4',
          taskID: 678,
          success: true
        })
      );
    });

    test('required partial body with additional fields', async () => {
      mockPartialUpdateObject.mockResolvedValue({
        objectID: 'myObjectID4',
        taskID: 678
      });

      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/movies/123',
        payload: {
          movie: {
            ...mockMovie,
            extraProperty: 'test'
          }
        }
      });

      expect(JSON.parse(res.payload)).toEqual(
        expect.objectContaining({
          objectID: 'myObjectID4',
          taskID: 678,
          success: true
        })
      );
    });

    test('required body with wrong type', async () => {
      mockPartialUpdateObject.mockResolvedValue({
        objectID: 'myObjectID4',
        taskID: 678
      });

      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/movies/123',
        payload: {
          movie: {
            ...mockMovie,
            year: 'tst'
          }
        }
      });

      expect(JSON.parse(res.payload)).toEqual(
        expect.objectContaining({
          error: 'Bad Request',
          message:
            'movie.year must be a `number` type, but the final value was: `NaN` (cast from the value `"tst"`).',
          statusCode: 400
        })
      );
    });

    test('required body', async () => {
      mockPartialUpdateObject.mockResolvedValue({
        objectID: 'myObjectID4',
        taskID: 678
      });

      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/movies/123',
        payload: {
          movie: mockMovie
        }
      });

      expect(JSON.parse(res.payload)).toEqual(
        expect.objectContaining({
          objectID: 'myObjectID4',
          taskID: 678,
          success: true
        })
      );
    });
  });

  // Remove
  describe('DELETE', () => {
    test('required body', async () => {
      mockDeleteObject.mockResolvedValue({
        objectID: 'myObjectID5',
        taskID: 678
      });

      const res = await app.inject({
        method: 'DELETE',
        url: '/api/v1/movies/123'
      });

      expect(JSON.parse(res.payload)).toEqual(
        expect.objectContaining({
          objectID: 'myObjectID5',
          taskID: 678,
          success: true
        })
      );
    });
  });
});
