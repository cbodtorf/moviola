import { Test, TestingModule } from '@nestjs/testing';

import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService],
    }).compile();
  });

  describe('create', () => {
    it('should return undefined', () => {
      const controller = app.get<MoviesController>(MoviesController);
      expect(controller.create({ test: 'test' })).toEqual(undefined);
    });
  });

  describe('update', () => {
    it('should return undefined', () => {
      const controller = app.get<MoviesController>(MoviesController);
      expect(controller.update('some-id', { test: 'test' })).toEqual(undefined);
    });
  });

  describe('remove', () => {
    it('should return undefined', () => {
      const controller = app.get<MoviesController>(MoviesController);
      expect(controller.remove('some-id')).toEqual(undefined);
    });
  });
});
