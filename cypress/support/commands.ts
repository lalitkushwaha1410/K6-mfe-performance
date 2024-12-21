/// <reference types="cypress" />

import { baseURL } from '../fixtures/constants/environment';

export { };
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      appUrl(): Chainable<void>;
      Login(user: string, password: string): Chainable<void>;
      lighthouse(customThresholds: any, Config: any): Chainable<any>;
      waitForVisible(selector: string, timeout: number);
    }
  }
}

Cypress.Commands.add('appUrl', () => {
  cy.visit(baseURL);
});

Cypress.Commands.add('Login', (username, password) => {
  cy.get('span[class="badge bg-primary"]').click();
  cy.get('#userNameInput').type(username);
  cy.get('#passwordInput').type(password);
  cy.get('#submitButton').click();
  cy.wait(8000);
  cy.reload();
  cy.wait(8000);
});

Cypress.Commands.add('waitForVisible', (selector, timeout) => {
  cy.get(selector, { timeout }).should('be.visible');
});

const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/;
Cypress.on('uncaught:exception', (err) => {
  /* returning false here prevents Cypress from failing the test */
  if (resizeObserverLoopErrRe.test(err.message)) {
    return false;
  }
});

Cypress.Commands.add('lighthouse', () => {
  return cy.task('lighthouse');
});