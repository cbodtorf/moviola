import { movieAddSchema, movieAddFastifySchema } from './schemas';
import { mockMovie } from '../../fixtures/movie';


describe('schemas', () => {
  describe('movieAddSchema', function () {
    it('should not accept an empty object', async () => {
      const result = await movieAddSchema.isValid({ });
      expect( result ).toEqual( false )
    });

    it('should accept an valid object', async () => {
      const result = await movieAddSchema.isValid(mockMovie)
      expect( result ).toEqual( true )
    });

    it('should validate title', async () => {
      const result = await movieAddSchema.isValid({
        ...movieAddSchema,
        title: 42
      });
      expect( result ).toEqual( false )
    });
  });

  // describe('movieFastifySchema', () => {
  //   it('should not accept an empty object', async () => {
  //     const result = await movieFastifySchema({ });
  //     expect( result ).toEqual( false )
  //   });

  //   it('should accept an valid object', async () => {
  //     const result = await movieFastifySchema.isValid(mockMovie)
  //     expect( result ).toEqual( true )
  //   });
  // })
});
