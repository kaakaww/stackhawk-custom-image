describe('empty spec', () => {
  it('passes', () => {
    cy.visit('/hidden/cypress');
    cy.title().should('include', 'cypress tests')
  })
})