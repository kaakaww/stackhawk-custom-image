declare namespace Cypress {
  interface Chainable {
    formAuth(email: string, password: string): void;
    jwtAuth(email: string, password: string): void;
    tokenAuth(email: string, password: string): void;
    basicAuth(email: string, password: string): void;
    formMultiAuth(email: string, password: string): void;
  }
}
