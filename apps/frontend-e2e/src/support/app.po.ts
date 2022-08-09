export const getGreeting = () => cy.get('h1');

export const getSearchBox = () => cy.get('[data-cy=SearchBox]');
export const getHits = () => cy.get('[data-cy=Hits]');
