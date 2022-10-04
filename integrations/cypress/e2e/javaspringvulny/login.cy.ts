describe('login', () => {

    it('can login', () => {
        cy.visit('/login');
        cy.formAuth("foo", "bar");
    });
})