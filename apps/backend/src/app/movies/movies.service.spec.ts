import { Test } from '@nestjs/testing';

import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = app.get<MoviesService>(MoviesService);
  });

  describe('create', () => {
    it('should return undefined', () => {
      expect(service.create({ test: 'test' })).toEqual(undefined);
    });
  });

  describe('update', () => {
    it('should return undefined', () => {
      expect(service.update('some-id', { test: 'test' })).toEqual(undefined);
    });
  });

  describe('remove', () => {
    it('should return undefined', () => {
      expect(service.remove('some-id')).toEqual(undefined);
    });
  });
});
