const WEBSITE_URL = 'http://localhost:3000';

context(`Hello test world!`, () => {
  before(() => cy.visit(WEBSITE_URL));

  it('is true', () => {
    return true;
  });
});

export {};
