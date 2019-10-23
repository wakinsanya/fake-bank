import { getGreeting } from '../support/app.po';

describe('fake-bank-app', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to fake-bank-app!');
  });
});
