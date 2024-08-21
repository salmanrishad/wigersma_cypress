///<reference types ="cypress"/>

describe('WeSelect Test', () => {
    it('Login', () => {
        cy.visit('http://localhost:3000')
        cy.get('form')
            .find('[data-testid="form-email"]')
            .type('spock@weselect.local')

        cy.get('form')
            .find('[data-testid="form-password"]')
            .type('P@ssword123')

        cy.get('button[type="submit"]')
            .click()

        cy.wait(2000)

        cy.get('[data-testid="avatar"]')
            .should('be.visible')

        cy.log('Logged in')
    })
})