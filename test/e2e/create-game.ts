const WEBSITE_URL = 'http://localhost:3000';

context(`Create Game`, () => {
    before(()=> cy.visit(WEBSITE_URL));

    it('is true', () => {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        cy.contains('Host a game').click();
        cy.get('#rounds').as('range').then(($range) => {
            // get the DOM node
            const range = $range[0];
            // set the value manually
            nativeInputValueSetter.call(range, 3);
            // now dispatch the event
            range.dispatchEvent(new Event('change', { value: 3, bubbles: true }as any));
          });

        cy.get('@range').siblings('p').should('have.text', '3 Rounds');
    });

})