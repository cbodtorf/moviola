import { buildTestInstance } from '../helper'

describe('health', () => {
  const app = buildTestInstance();

  test('default health route', async () => {
    const res = await app.inject({
      url: '/health'
    });

    expect(JSON.parse(res.payload)).toEqual(
      expect.objectContaining({
        info: expect.objectContaining({
          name: 'Backend Health Check'
        })
      })
    );

  });

});