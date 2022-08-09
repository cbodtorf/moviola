import { getGreeting, getSearchBox, getHits } from '../support/app.po';

describe('frontend', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    // cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Moviola 📽️');

    getSearchBox().type('Star Wars: Episode');
    // 6 star wars episodes and our final create hit.
    getHits().children().should('have.length', 7);
  });
});
