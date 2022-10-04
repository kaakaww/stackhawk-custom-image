describe('login', () => {

    it('can login with formAuth', () => {
        cy.formAuth();
        cy.get('button:contains("Sign Out")').should('be.visible');
    });

    it('can login with jwtAuth', () => {
        cy.jwtAuth();
        cy.attemptSearch("test")
        cy.get('button#logout').should('be.visible').click();
    });

    it('can login with tokenAuth', () => {
        cy.tokenAuth();
        cy.attemptSearch("test")
        cy.get('#results').should('have.class', 'alert-success');
    });

    it('can login with basicAuth', () => {
        cy.basicAuth();
        cy.attemptSearch("test")
        cy.get('#results').should('have.class', 'alert-success');
    });

    it('can login with formMultiAuth', () => {
        cy.visit('/login-form-multi');
        cy.formMultiAuth();
        cy.get('#results').should('have.class', 'alert-success');
    });

    afterEach(() => {
        cy.signOut();
    })
})