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
Cypress.Commands.add('form-auth', (email, password) => {
    cy.visit(`${APP_HOST}/login`) 
})
// -- This is a parent command --
Cypress.Commands.add('jwt-auth', (email, password) => {
    cy.visit(`${APP_HOST}/jwt-auth`) 
})
// -- This is a parent command --
Cypress.Commands.add('token-auth', (email, password) => {
    cy.visit(`${APP_HOST}/token-auth`) 
})
// -- This is a parent command --
Cypress.Commands.add('basic-auth', (email, password) => {
    cy.visit(`${APP_HOST}/basic-auth`) 
})
// -- This is a parent command --
Cypress.Commands.add('Form-multi-auth', (email, password) => {
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