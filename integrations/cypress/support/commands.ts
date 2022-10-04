// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
const APP_HOST = Cypress.config().baseUrl
Cypress.Commands.add('formAuth', (email, password) => {
    cy.visit(`${APP_HOST}/login`)
    cy.get('#username').type(email);
    cy.get('#password').type(password);
    cy.get('.btn').click();
})
// -- This is a parent command --
Cypress.Commands.add('jwtAuth', (email, password) => {
    cy.visit(`${APP_HOST}/jwt-auth`) 
})
// -- This is a parent command --
Cypress.Commands.add('tokenAuth', (email, password) => {
    cy.visit(`${APP_HOST}/token-auth`) 
})
// -- This is a parent command --
Cypress.Commands.add('basicAuth', (email, password) => {
    cy.visit(`${APP_HOST}/basic-auth`) 
})
// -- This is a parent command --
Cypress.Commands.add('formMultiAuth', (email, password) => {
    cy.visit(`${APP_HOST}/login-form-multi`) 
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })