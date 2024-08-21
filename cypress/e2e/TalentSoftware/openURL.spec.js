///<reference types = "cypress"/>

describe('Open Preview URL', () =>{
    beforeEach('Login to Talent Software', () =>{
        cy.logintotalentsoftware()
    })

    it('Open Preview URL', () =>{

        cy.wait(7000)
        cy.xpath(`//span[normalize-space()='Positions']`)
        .click()

        cy.wait(6000)
        cy.xpath(`//tbody/tr[1]/td[7]/div[1]/button[1]//*[name()='svg']`)
        .click()

        cy.intercept('POST', 'https://qa.api.talentsoftware.weselect.com/api/positions/*/preview').as('capturedRequest');
        cy.get('[data-testid="position-preview-button"]').click();
        
        cy.wait('@capturedRequest').then((interception) => {
            const positionID = interception.response.body.payload;
            cy.log(positionID);
            // cy.log(JSON.stringify(interception.request.headers))
            // const authHeader = interception.response.headers['Authorization']
            // const accessToken = authHeader
            // cy.log(`Access Token: ${accessToken}`)

            cy.visit(`https://qa.api.talentsoftware.weselect.com/api/positions/${positionID}/preview`)
            cy.xpath(`//a[@class='btn cta btn-ts']`)
            .click()
        });
  })
})