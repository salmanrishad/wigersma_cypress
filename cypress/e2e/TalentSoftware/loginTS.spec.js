///<reference types = "cypress"/>

function getTONewPositionFlow() {
    cy.xpath(`//span[normalize-space()='Positions']`)
        .click()
    cy.xpath(`//div[@class='flex items-center gap-x-1']`)
        .click()
    cy.xpath(`//div[@class='flex items-center']`)
        .click()
    cy.get('[data-testid="position-name-input"]')
        .should('be.visible')
}

function getFormattedDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

describe('Create New Position', () => {

    beforeEach('Login to Talent Software', () => {
        cy.logintotalentsoftware()
    })
    it('Get to Add New Position', () => {
        getTONewPositionFlow()
    })

    it.only('New Position First Page', () => {
        var publishDate = getFormattedDate()
        var applicationDeadline = getFormattedDate() + 30
        getTONewPositionFlow()
        cy.xpath(`//input[@data-testid='position-name-input']`)
            .type('Test Position')
        cy.get('[data-testid="position-publish-date-input"]')
            .clear()
            .type(publishDate)
        cy.get('[data-testid="position-application-date-input"]')
            .clear()
            .type(applicationDeadline)
        cy.readFile('cypress/fixtures/JobDescription.txt')
            .then((filecontent) => {
                cy.get('[class="ql-editor ql-blank"]')
                    .type(filecontent)
            })

        cy.get('[data-testid="position-logo-input"]') // File input selector
            .attachFile('Logo.jpg'); // File in the fixtures folder

        cy.wait(500)
        cy.get('[data-testid="position-logo-canvas"]')
            .should('be.visible')
            // .and(($div) => {
            //     // Check if the background image URL includes the filename
            //     const bgImage = $div.css('background-image');
            //     expect(bgImage).to.include('Logo.jpg'); // Ensure the background image URL contains the file name
            // });
    })
})