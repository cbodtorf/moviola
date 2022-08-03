import { buildTestInstance } from '../helper';
import {
  mockSaveObject,
  mockPartialUpdateObject,
  mockDeleteObject
} from '../__mocks__/algoliasearch';

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
        message: 'body must be object',
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
          movie: {
            title: 'test'
          }
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
        message: 'body must be object',
        statusCode: 400
      });
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
          movie: {
            title: 'updated test'
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