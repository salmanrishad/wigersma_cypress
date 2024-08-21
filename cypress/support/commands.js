import 'cypress-file-upload';

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
// Cypress.Commands.add('login', (email, password) => { ... })
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

/// <reference types="cypress-xpath" />

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

Cypress.Commands.add('logintotalentsoftware', () =>{
  cy.visit('https://qa.talentsoftware.weselect.com/')
  cy.xpath(`//input[@data-testid='form-email']`)
      .type('spock@weselect.local')
  cy.xpath(`//input[@data-testid='form-password']`)
      .type('P@ssword123')
  cy.xpath(`//button[@type='submit']`)
      .click()
  cy.wait(6000)
  cy.get('[data-testid="avatar"]')
      .should('be.visible')
})

Cypress.Commands.add('loginAsCustomer', () =>{
    cy.visit('http://customer.plexor.online:4000/')
    cy.get('[name="username"]').type('salman')
    cy.get('[name="password"]').type('rishad')
    cy.get('button').contains('Log In').click()
    cy.wait(6000)
})

Cypress.Commands.add('login', () => {
    cy.session('login', () => {
      cy.request({
        method: 'POST',
        url: 'http://20.52.5.183:5000/api/v1/auth/login', // Replace with your login API endpoint
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: {
            username: 'salmansubdomain', // Replace with your username
            password: 'rishad',  // Replace with your password
            sub_domain: 'salmansubdomain'
          }
      }).then((resp) => {
        // Assuming the response contains a token
        window.localStorage.setItem('authToken', resp.body.access_token);
      });
    }, {
      validate() {
        // Validate the session, e.g., by checking if a token exists
        return window.localStorage.getItem('authToken') !== null;
      }
    });
  });

require('@4tw/cypress-drag-drop')
